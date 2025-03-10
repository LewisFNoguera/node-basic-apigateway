const grpc = require("./grpc.routes");
const proxy = require("../services/Proxy.service");

module.exports = (app) => {
  app.use("/api/gprc", grpc);
  app.use("/api", proxy);
  app.get("/", (req, res) => res.send("API"));
};