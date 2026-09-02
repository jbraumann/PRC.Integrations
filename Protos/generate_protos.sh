#!/bin/bash
# Regenerates the gRPC client code of every integration from prc.proto.
# prc.proto is delivered from the main PRC repository - update it here first.
#
# The grpcio-tools versions are pinned per integration so the generated code keeps
# matching the runtimes the integrations ship with or document:
#   1.69.0 emits gencode 5.29.0 - Python and Blender, users pip install grpcio themselves
#   1.72.0 emits gencode 6.30.0 - Blender Geometry Nodes, matches its bundled wheels
#   1.67.1 emits gencode 5.27.2 - Fusion360 bundles grpcio 1.67.1 and protobuf 5.28.3,
#                                 newer generators produce code its runtime refuses to load
set -e
cd "$(dirname "$0")"

# prc.proto is kept with CRLF line endings here. The Python gRPC generator copies
# the service comments into docstrings verbatim, carriage returns included, which
# would leave the stubs with mixed line endings - so every generator reads an LF
# copy instead. It must keep the name prc.proto: the name is baked into the stubs.
LFDIR=$(mktemp -d)
trap 'rm -rf "$LFDIR"' EXIT
tr -d '\r' < prc.proto > "$LFDIR/prc.proto"

# One venv per pinned generator version, created on first run.
gen () {
    VERSION=$1; shift
    VENV=.venv-grpcio-tools-$VERSION
    if [ ! -d "$VENV" ]; then
        python3 -m venv "$VENV"
        "$VENV/bin/pip" install --quiet grpcio-tools==$VERSION
    fi
    "$VENV/bin/python" -m grpc_tools.protoc -I"$LFDIR" "$@" prc.proto
}

gen 1.69.0 --python_out=../Python  --pyi_out=../Python  --grpc_python_out=../Python
gen 1.69.0 --python_out=../Blender --pyi_out=../Blender --grpc_python_out=../Blender
gen 1.72.0 "--python_out=../Blender Geometry Nodes/Source" "--grpc_python_out=../Blender Geometry Nodes/Source"
gen 1.67.1 --python_out=../Fusion360/ParametricRobotControl/commands/prcUI \
           --pyi_out=../Fusion360/ParametricRobotControl/commands/prcUI \
           --grpc_python_out=../Fusion360/ParametricRobotControl/commands/prcUI

# The Geometry Nodes add-on is a Blender *extension* (a proper Python package,
# bl_ext.user_default.prc_blender) and deliberately does not touch sys.path,
# so protoc's absolute "import prc_pb2" cannot resolve there — it only fails
# at enable time with ModuleNotFoundError. Rewrite it to a relative import.
# The other integrations sys.path.append their folder and keep the generated
# absolute import as is.
sed -i 's/^import prc_pb2 as prc__pb2$/from . import prc_pb2 as prc__pb2/' \
    "../Blender Geometry Nodes/Source/prc_pb2_grpc.py"

# After regenerating the Blender Geometry Nodes source, repack prc_blender.zip
# from the Source folder (contents at the zip root, without __pycache__).

# The JavaScript/gRPC-Web generators are plugin binaries, installed once via
#   npm install protoc-gen-js protoc-gen-grpc-web
# grpc_tools.protoc stands in for protoc and calls them through --plugin.
# commonjs+dts also emits the prc_pb.d.ts/prc_grpc_web_pb.d.ts typings.
JSBIN=node_modules/.bin
if [ -x "$JSBIN/protoc-gen-js" ] && [ -x "$JSBIN/protoc-gen-grpc-web" ]; then
    gen 1.69.0 --plugin=protoc-gen-js=$JSBIN/protoc-gen-js \
        --js_out=import_style=commonjs,binary:../Javascript \
        --plugin=protoc-gen-grpc-web=$JSBIN/protoc-gen-grpc-web \
        --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:../Javascript
else
    echo "Skipping JavaScript: run 'npm install protoc-gen-js protoc-gen-grpc-web' in Protos/ first."
fi

# Afterwards rebuild the browser bundle (npm install once, then npx webpack in
# Javascript/) and copy dist/prc.js, dist/prc.js.map and export.js to
# Illustrator/js/libs/, which ships the same bundle.
