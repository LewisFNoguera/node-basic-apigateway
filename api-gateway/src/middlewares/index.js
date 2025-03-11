const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const logger = require("../config/logger");
const limiter = require("../config/rateLimitConfig");

module.exports = (app) => {
  const corsOptions ={
    origin:'*', 
    methods: 'GET',
    allowedHeader: 'Content-Type',
    optionSuccessStatus:200
}

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json());
  app.disable("x-powered-by"); // Hide the X-Powered-By header
  app.use(limiter);

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
};