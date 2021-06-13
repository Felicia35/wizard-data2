const EyeData = require("../../models/eyeData");
const EditorData = require("../../models/editorData");
const MoleData = require("../../models/moleData");
const BehaviorData = require('../../models/behaviorData');

exports.listEyeData = (req, res) => {
  EyeData.getAll(req.params.pid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eye data.",
      });
    else res.status(200).json({ data: data });
  });
};

exports.listEditorData = (req, res) => {
  EditorData.getAll(req.params.pid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving editor data.",
      });
    else res.status(200).json({ data: data });
  });
};

exports.importEditorData = async (req, res) => {
    if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

    let {editorData} = req.body;
    EditorData.create({ editorData }, async (err, data) => {
      if (err)
        res
          .status(500)
          .send({
            message:
              err.message || "Some error occurred while import the Editor Data",
          });
      else res.status(201).json({ data: data });
    });
};


exports.listMoleData = (req, res) => {
  MoleData.getAll(req.params.pid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving mole data.",
      });
    else res.status(200).json({ data: data });
  });
};

exports.listBehaviorData = (req, res) => {
  BehaviorData.getAll(req.params.pid, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving behavior data.",
      });
    else res.status(200).json({ data: data });
  });
};


