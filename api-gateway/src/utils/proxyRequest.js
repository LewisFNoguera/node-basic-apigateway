const httpProxy = require('http-proxy');
const logger = require('../config/logger');
const { setCache } = require('../config/cache');

const proxy = httpProxy.createProxyServer();

const proxyRequest = (req, res, target) => {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target }, (err) => {
      if (err) {
        logger.error(`Proxy error: ${err.message}`);
        reject(new Error('Microservice unavailable'));
      }
    });

    proxy.once('proxyRes', (proxyRes) => {
      let body = '';

      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', () => {
        try {
          const data = JSON.parse(body);
          setCache(req.originalUrl, data); // Guardamos en caché
          resolve();
        } catch (error) {
          logger.error(`Error parsing response: ${error.message}`);
          reject(error);
        }
      });
    });
  });
};

module.exports = proxyRequest;
