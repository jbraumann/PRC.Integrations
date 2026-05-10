"""Parametric Robot Control — Blender add-on (entry point).

Wraps the PRC server (https://127.0.0.1:5001) for parametric robot toolpath
authoring inside Blender. Motion programs are authored with Geometry Nodes
and submitted to PRC over gRPC.
"""

import bpy
from bpy.app.handlers import persistent

from . import properties
from . import operators
from . import panels
from . import node_groups
from . import auto_load


_modules = (properties, operators, panels, node_groups, auto_load)


@persistent
def _on_blend_loaded(_dummy):
    """After a .blend file loads, recreate the persistent toolpath materials
    so the colour pickers in the panel are available immediately, even
    before the user runs Load Task."""
    try:
        from . import grpc_client
        grpc_client._ensure_toolpath_materials()
    except Exception:  # noqa: BLE001
        pass


def register():
    for m in _modules:
        m.register()
    # Make the toolpath materials available right away in the current file.
    try:
        from . import grpc_client
        grpc_client._ensure_toolpath_materials()
    except Exception:  # noqa: BLE001
        pass
    if _on_blend_loaded not in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.append(_on_blend_loaded)


def unregister():
    if _on_blend_loaded in bpy.app.handlers.load_post:
        bpy.app.handlers.load_post.remove(_on_blend_loaded)
    # Best-effort: always try to disconnect first so threads exit cleanly.
    try:
        from . import grpc_client
        grpc_client.disconnect()
    except Exception:  # noqa: BLE001
        pass

    for m in reversed(_modules):
        try:
            m.unregister()
        except Exception:  # noqa: BLE001
            pass


if __name__ == "__main__":
    register()
