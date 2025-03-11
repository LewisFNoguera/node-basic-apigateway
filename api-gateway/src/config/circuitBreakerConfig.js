const CircuitBreaker = require('opossum');
const logger = require('../config/logger');

const breakerOptions = {
  timeout: 5000, // 5s
  errorThresholdPercentage: 50, // Se activa si el 50% de solicitudes fallan
  resetTimeout: 10000, // Reintento 10s
};

const createCircuitBreaker = (proxyRequest, target) => {
  const breaker = new CircuitBreaker((req, res) => proxyRequest(req, res, target), breakerOptions);

  breaker.on('open', () => logger.warn(`Circuit Breaker OPEN for ${target}`));
  breaker.on('close', () => logger.info(`Circuit Breaker CLOSED for ${target}`));
  breaker.on('halfOpen', () => logger.info(`Circuit Breaker HALF-OPEN for ${target}`));

  return breaker;
};

module.exports = createCircuitBreaker;
