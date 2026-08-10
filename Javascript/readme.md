The prc_pb.js, prc_grpc_web_pb.js and *.d.ts files are generated out of prc.proto, which lives in ../Protos together with generate_protos.sh, a script that regenerates the client code of all integrations at once.

To generate just the JS library, run the following command next to the prc.proto file

protoc -I=. prc.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:.

The commonjs+dts import style also emits the prc_pb.d.ts and prc_grpc_web_pb.d.ts Typescript definitions, which can be useful for auto-completion.

Note that protoc no longer ships the JavaScript generator itself, so the command needs the protoc-gen-js and protoc-gen-grpc-web plugins on the PATH (npm install protoc-gen-js protoc-gen-grpc-web).

Working with our example, make sure that you have got NPM installed, use npm install, followed by npx webpack to create the PRC.js library. You can run it e.g. via npx http-server. New message types must also be added to export.js to become part of the bundle.

The Illustrator extension ships the same bundle, so copy dist/prc.js, dist/prc.js.map and export.js to ../Illustrator/js/libs/ after rebuilding.
