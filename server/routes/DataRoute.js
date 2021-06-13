const DataRoute = require("express").Router();
const DataController = require("../controllers/api/DataController");

DataRoute.get("/eye/:rid", DataController.listEyeData);
DataRoute.get("/mole/:rid", DataController.listMoleData);
DataRoute.get("/editor/:rid", DataController.listEditorData);
DataRoute.get("/behavior/:rid", DataController.listBehaviorData);

DataRoute.post("/create", DataController.createRecordData);

module.exports = DataRoute;
