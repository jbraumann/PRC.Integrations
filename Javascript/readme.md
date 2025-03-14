Generate the JS library via the following command out of the prc.proto file

protoc -I=. prc.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

  Typescript can be useful for auto-completion, you may generate it via 
  protoc -I=. prc.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=typescript,mode=grpcweb:.

Working with our example, make sure that you have got NPM installed, use npm install, followed by npx webpack to create the PRC.js library. You can run it e.g. via npx http-server