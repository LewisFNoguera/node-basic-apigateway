const { getCache } = require('../config/cache');
const logger = require('../config/logger');

const cacheBreakerMiddleware = (breaker) => async (req, res) => {
  const cachedData = getCache(req.originalUrl);
  
  if (cachedData) {
    logger.info(`🔄 Cache HIT for: ${req.originalUrl}`);
    return res.json(cachedData);
  }

  try {
    logger.info(`🚀 Calling Circuit Breaker for: ${req.originalUrl}`);
    await breaker.fire(req, res);
  } catch (error) {
    logger.error(`❌ Circuit Breaker FAILURE: ${error.message}`);
    res.status(503).json({ error: 'Service unavailable' });
  }
};

module.exports = cacheBreakerMiddleware;
