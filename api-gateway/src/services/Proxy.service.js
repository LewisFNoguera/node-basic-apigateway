const express = require('express');
const SERVICES = require('../routes/services.routes');
const createCircuitBreaker = require('../config/circuitBreakerConfig');
const cacheBreakerMiddleware = require('../middlewares/cacheBreakerMiddleware');

const proxyRequest = require('../utils/proxyRequest');
const router = express.Router();

// Creamos circuit breakers para cada servicio
const usersCircuitBreaker = createCircuitBreaker(proxyRequest, SERVICES.users);
const productsCircuitBreaker = createCircuitBreaker(proxyRequest, SERVICES.products);
const messageFromBackendCircuitBreaker = createCircuitBreaker(proxyRequest, SERVICES.demo);

// Usamos el middleware para los endpoints
router.use("/users", cacheBreakerMiddleware(usersCircuitBreaker));
router.use("/products", cacheBreakerMiddleware(productsCircuitBreaker));
router.use("/demo", cacheBreakerMiddleware(messageFromBackendCircuitBreaker));

module.exports = router;