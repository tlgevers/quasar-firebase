// Package main implements a server for Greeter service.
package main

import (
	"context"
	"log"
	"net"

	// cb "google.golang.org/api/cloudbilling/v1"
	"google.golang.org/grpc"
	pb "googleservices/pkg/cloudbilling"
)

const (
	port = ":50051"
)

// sayHello implements helloworld.GreeterServer.SayHello
func getServices(ctx context.Context, in *pb.ServicesRequest) (*pb.ServicesResponse, error) {
	// billingbudgetsService, err := cb.NewService(ctx)
	// if err != nil {
	// 	panic(err)
	// }

	log.Printf("Received: %v", in.GetName())
	var names []*pb.Service
	service := &pb.Service{
		Name: "Trevor",
	}
	names = append(names, service)
	return &pb.ServicesResponse{Names: names}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterCloudBillingService(s, &pb.CloudBillingService{GetServices: getServices})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
