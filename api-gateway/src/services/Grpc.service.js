const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const SERVICES = require('../routes/services.routes');
const CircuitBreaker = require('opossum');
const NodeCache = require('node-cache');
const logger = require('../config/logger'); // Asegúrate de tener un logger configurado


// Configurar caché con TTL de 60 segundos
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });


// Cargar el proto
const packageDefinition = protoLoader.loadSync(__dirname + '/../config/service.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const serviceProto = grpc.loadPackageDefinition(packageDefinition).service;
const client = new serviceProto.ExampleService(SERVICES.grpc, grpc.credentials.createInsecure());

// Función que realiza la llamada gRPC con caché
const callGrpcService = () => {
    return new Promise((resolve, reject) => {
        // Verificar si la respuesta está en caché
        const cachedData = cache.get('grpcData');
        if (cachedData) {
            logger.info('🔄 Cache HIT for gRPC');
            return resolve(cachedData);
        }

        // Si no está en caché, hacer la petición gRPC
        client.GetData({}, (error, response) => {
            if (error) {
                logger.error(`❌ gRPC error: ${error.message}`);
                reject(error);
            } else {
                logger.info('✅ gRPC response received, caching result');
                cache.set('grpcData', response); // Guardar en caché
                resolve(response);
            }
        });
    });
};

// Opciones del Circuit Breaker
const breakerOptions = {
    timeout: 5000, // Timeout de 5 segundos
    errorThresholdPercentage: 50, // Se activa si el 50% de las solicitudes fallan
    resetTimeout: 10000, // Intenta recuperarse después de 10 segundos
};

// Crear Circuit Breaker para gRPC
const grpcBreaker = new CircuitBreaker(callGrpcService, breakerOptions);

// Agregar logs al Circuit Breaker
grpcBreaker.on('open', () => logger.warn('⚠️ Circuit Breaker OPEN for gRPC Service'));
grpcBreaker.on('close', () => logger.info('✅ Circuit Breaker CLOSED for gRPC Service'));
grpcBreaker.on('halfOpen', () => logger.info('🟡 Circuit Breaker HALF-OPEN for gRPC Service'));

module.exports = grpcBreaker;
