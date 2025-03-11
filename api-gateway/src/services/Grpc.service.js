const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const SERVICES = require('../routes/services.routes');
const CircuitBreaker = require('opossum');
const NodeCache = require('node-cache');
const logger = require('../config/logger');


const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const packageDefinition = protoLoader.loadSync(__dirname + '/../config/service.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition).service;
const client = new serviceProto.ExampleService(SERVICES.grpc, grpc.credentials.createInsecure());

const callGrpcService = () => {
    return new Promise((resolve, reject) => {        
        const cachedData = cache.get('grpcData');
        if (cachedData) {
            logger.info('🔄 Cache HIT for gRPC');
            return resolve(cachedData);
        }

     
        client.GetData({}, (error, response) => {
            if (error) {
                logger.error(`gRPC error: ${error.message}`);
                reject(error);
            } else {
                logger.info('gRPC response received, caching result');
                cache.set('grpcData', response); // Guardar en caché
                resolve(response);
            }
        });
    });
};


const breakerOptions = {
    timeout: 5000,
    errorThresholdPercentage: 50, 
    resetTimeout: 10000, 
};


const grpcBreaker = new CircuitBreaker(callGrpcService, breakerOptions);


grpcBreaker.on('open', () => logger.warn('Circuit Breaker OPEN for gRPC Service'));
grpcBreaker.on('close', () => logger.info('Circuit Breaker CLOSED for gRPC Service'));
grpcBreaker.on('halfOpen', () => logger.info('Circuit Breaker HALF-OPEN for gRPC Service'));

module.exports = grpcBreaker;
