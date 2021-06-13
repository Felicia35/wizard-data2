const DataRoute = require("express").Router();
const DataController = require("../controllers/api/DataController");

DataRoute.get("/eye/:pid", DataController.listEyeData);
DataRoute.get("/mole/:pid", DataController.listMoleData);

DataRoute.get("/editor/:pid", DataController.listEditorData);
DataRoute.post('/editor/import', DataController.importEditorData);

DataRoute.get("/behavior/:pid", DataController.listBehaviorData);

module.exports = DataRoute;
