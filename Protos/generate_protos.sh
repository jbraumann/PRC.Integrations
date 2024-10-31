python3 -m grpc_tools.protoc -I. --python_out=. --pyi_out=. --grpc_python_out=. prc.proto

protoc -I=. prc.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

protoc -I=. prc.proto \
  --js_out=import_style=commonjs,binary:. \
  --grpc-web_out=import_style=typescript,mode=grpcweb:.