const routes = require("express").Router();
const DataRoute = require("./DataRoute");

routes.use("/data", DataRoute);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to API" });
});

module.exports = routes;