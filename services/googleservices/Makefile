all:
	protoc --go_out=. --go-grpc_out=. \
		--go_opt=paths=source_relative \
		--go-grpc_opt=paths=source_relative \
		pkg/cloudbilling/cloudbilling.proto
	# protoc -I ./protos/ ./protos/cloudbilling.proto --grpc-gateway_out=./protos
