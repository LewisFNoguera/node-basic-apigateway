const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const cache = require('./utils/cache');
const packageDefinition = protoLoader.loadSync('grpc-service/service.proto');
const serviceProto = grpc.loadPackageDefinition(packageDefinition).service;

const server = new grpc.Server();
server.addService(serviceProto.ExampleService.service, {
    GetData: (call, callback) => {
        const cachedData = cache.get('grpcData');
        if (cachedData) return callback(null, cachedData);
        
        const response = { message: 'Respuesta desde gRPC' };
        cache.set('grpcData', response, 60); // Cache 60 segundos
        callback(null, response);
    }
});

server.bindAsync('0.0.0.0:5003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC service running on port 5003');
});

