const express = require('express');
const grpcBreaker = require('../services/Grpc.service');
const router = express.Router();
const logger = require('../config/logger'); 

router.get('/', async (req, res) => {
    try {
        logger.info('🚀 Calling gRPC service through Circuit Breaker');
        const response = await grpcBreaker.fire();
        res.json(response);
    } catch (error) {
        logger.error('❌ Circuit Breaker FAILURE: gRPC Service unavailable');
        res.status(503).json({ error: 'gRPC Service unavailable' });
    }
});

module.exports = router;
