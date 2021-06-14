const DataRoute = require("express").Router();
const DataController = require("../controllers/api/DataController");

DataRoute.get("/eye/:recordName", DataController.listEyeData);
DataRoute.get("/mole/:recordName", DataController.listMoleData);
DataRoute.get("/editor/:recordName", DataController.listEditorData);
DataRoute.get("/behavior/:recordName", DataController.listBehaviorData);

DataRoute.post("/create", DataController.createRecordData);
DataRoute.get('/index', DataController.listRecordData);

module.exports = DataRoute;
