const NodeCache = require('node-cache');
const logger = require('../config/logger');

const cache = new NodeCache({ stdTTL: 30, checkperiod: 120 }); // TTL default 60s

const setCache = (key, value) => {
  cache.set(key, value);
  logger.info(`✅ Cache updated for: ${key}`);
};

const getCache = (key) => cache.get(key);

module.exports = { cache, setCache, getCache };
