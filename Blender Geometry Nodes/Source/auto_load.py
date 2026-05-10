"""Auto-simulate on Edit — depsgraph-driven re-submission of the PRC task.

Watches the evaluated geometry of the PRC_Program carrier object. When the
user changes anything that affects the GN tree's output (a node socket, an
upstream Object's transform, etc.), schedule a debounced re-load that
mirrors what the manual `prc.load_task` operator does:

    build_task_from_carrier(scene) -> task
    grpc_client.add_task(task)
    grpc_client.update_simulation(scene.prc.simulation_slider)

The debounce is leading-edge + trailing-coalesce:

    * The first edit after >_QUIET_S of inactivity submits immediately
      (instant feel for one-off nudges).
    * Edits arriving during a burst slide a trailing timer; one final
      submission fires _DEBOUNCE_S after the burst ends.

This keeps single edits responsive without spamming the server during
slider drags or rapid sequences.

Opt-in via `scene.prc.auto_load_enabled`. The handler is cheap to leave
registered: if the toggle is off, or if PRC isn't connected, the early
exits cost a couple of attribute lookups.
"""

from __future__ import annotations

import time
from typing import Optional

import bpy
from bpy.app.handlers import persistent

from . import grpc_client as _client
from . import node_groups as _ng
from . import reader as _reader


# Trailing debounce delay — fires this long after the *last* edit in a burst.
_DEBOUNCE_S: float = 0.15

# Inactivity threshold for the leading edge. The next edit after this much
# quiet is treated as a fresh user action and submits immediately.
_QUIET_S: float = 1.0

# After a .blend file load, the depsgraph fires update events for everything
# during initial evaluation. Suppress auto-loads for a short window so we
# don't fire a stale task to the server before the user has touched anything.
_LOAD_SUPPRESS_S: float = 1.0
_suppress_until_ts: float = 0.0

# Trailing timer state. Each new edit during a burst re-arms it.
_timer_armed: bool = False

# Monotonic timestamp of the most recent submission (leading or trailing).
# Used to decide whether the next edit qualifies for a leading-edge fire.
_last_fire_ts: float = 0.0


# ---------------------------------------------------------------------------
# Debounced submission
# ---------------------------------------------------------------------------

def _do_submit() -> None:
    """Build, submit, and refresh the viewport. Runs on the main thread."""
    global _last_fire_ts

    scene = bpy.context.scene
    if scene is None or not _should_auto_load(scene):
        return

    try:
        task = _reader.build_task_from_carrier(scene)
    except Exception as e:  # noqa: BLE001
        scene.prc.status_message = f"Auto-simulate (reader): {e}"
        return

    _, info = _client.add_task(task)
    scene.prc.status_message = info
    # Refresh viewport at the slider's current position so the user sees
    # the new task without having to nudge the slider.
    try:
        _client.update_simulation(scene.prc.simulation_slider)
    except Exception:  # noqa: BLE001
        pass

    _last_fire_ts = time.monotonic()


def _perform_auto_load() -> Optional[float]:
    """Trailing-edge timer callback. Returns None to deregister."""
    global _timer_armed
    _timer_armed = False
    _do_submit()
    return None


def _arm_debounce(delay_s: float = _DEBOUNCE_S) -> None:
    """Schedule a submission for the current edit.

    Leading edge: if the timer isn't already armed and the last submission
    was more than _QUIET_S ago, submit immediately so single edits feel
    instant. Otherwise (mid-burst), slide the trailing timer so only one
    submission fires after the user stops editing."""
    global _timer_armed

    if not _timer_armed and (time.monotonic() - _last_fire_ts) > _QUIET_S:
        _do_submit()
        return

    if _timer_armed and bpy.app.timers.is_registered(_perform_auto_load):
        try:
            bpy.app.timers.unregister(_perform_auto_load)
        except ValueError:
            pass
    _timer_armed = True
    bpy.app.timers.register(_perform_auto_load, first_interval=delay_s)


# ---------------------------------------------------------------------------
# Predicates
# ---------------------------------------------------------------------------

def _should_auto_load(scene) -> bool:
    if time.monotonic() < _suppress_until_ts:
        return False
    if not getattr(scene.prc, "auto_load_enabled", False):
        return False
    return _client.is_setup_done()


# ---------------------------------------------------------------------------
# Handlers
# ---------------------------------------------------------------------------

@persistent
def _on_depsgraph_update(scene, depsgraph):
    """Filter the depsgraph update list down to changes that touch the
    PRC_Program carrier's evaluated geometry, then re-arm the debounce.

    The filter is critical: AddRobotTask writes to the toolpath tube
    objects and the TCP marker, which would otherwise re-fire the
    handler in a loop. Those writes don't touch the carrier object's
    evaluated geometry, so they pass through here without re-arming."""
    if not _should_auto_load(scene):
        return

    carrier_name = _ng.CARRIER_OBJECT_NAME
    for u in depsgraph.updates:
        try:
            orig = u.id.original
            if orig is None:
                continue
            if orig.name != carrier_name:
                continue
            if not u.is_updated_geometry:
                continue
        except (AttributeError, ReferenceError):
            continue
        _arm_debounce()
        return


@persistent
def _on_load_post(_dummy):
    """Suppress auto-loads for a short window after a .blend opens —
    initial depsgraph evaluation fires update events for everything and
    we don't want to interpret that as a user edit."""
    global _suppress_until_ts
    _suppress_until_ts = time.monotonic() + _LOAD_SUPPRESS_S


# ---------------------------------------------------------------------------
# Registration
# ---------------------------------------------------------------------------

def register() -> None:
    if _on_depsgraph_update not in bpy.app.handlers.depsgraph_update_post:
        bpy.app.handlers.depsgraph_update_post.append(_on_depsgraph_update)
    if _on_load_post not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(_on_load_post)


def unregister() -> None:
    global _timer_armed
    if _on_depsgraph_update in bpy.app.handlers.depsgraph_update_post:
        try:
            bpy.app.handlers.depsgraph_update_post.remove(_on_depsgraph_update)
        except ValueError:
            pass
    if _on_load_post in bpy.app.handlers.load_post:
        try:
            bpy.app.handlers.load_post.remove(_on_load_post)
        except ValueError:
            pass
    if _timer_armed and bpy.app.timers.is_registered(_perform_auto_load):
        try:
            bpy.app.timers.unregister(_perform_auto_load)
        except ValueError:
            pass
    _timer_armed = False
