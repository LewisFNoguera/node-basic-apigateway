const express = require("express");
const logger = require("./src/config/logger");
const routes = require("./src/routes");
const middlewares = require("./src/middlewares");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

middlewares(app);
routes(app);

app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`API Gateway corriendo en http://localhost:${PORT}`);
});