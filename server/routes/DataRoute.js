const DataRoute = require("express").Router();
const DataController = require("../controllers/api/DataController");

DataRoute.get('/index', DataController.listRecordData);
DataRoute.get('/xyPos/:recordName', DataController.listXYPosition);
DataRoute.get("/:recordName", DataController.listAllData);

DataRoute.post("/create", DataController.createRecordData);

module.exports = DataRoute;
