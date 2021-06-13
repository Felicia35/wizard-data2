const EyeData = require("../../models/eyeData");
const EditorData = require("../../models/editorData");
const MoleData = require("../../models/moleData");
const BehaviorData = require("../../models/behaviorData");
const sql = require("../../models/db");

exports.createRecordData = async (req, res) => {
  if (!req.body) res.status(400).send({ message: "Content can not be empty!" });

  const { createInfo } = req.body;
  const { eyeData, moleData, editorData, behaviorData } = createInfo;

  const recordData = {
    recordName: createInfo.recordName,
    recordCreator: createInfo.recordCreator,
    eyeData: eyeData.name,
    moleData: moleData.name,
    editorData: editorData.name,
    behaviorData: behaviorData.name,
    timestamp: createInfo.createdAt,
  };

  sql.query("INSERT INTO record_data SET ?", recordData, (err, rd) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while import the Record Data",
      });
    } else {
      console.log("Record>>>", rd);

      editorData.data.shift();
      let ED = editorData.data;
      ED.forEach((d) => d.push(editorData.name));
      EditorData.create(ED, (err, data) => {
        if (err)
          res
            .status(500)
            .send({
              message:
                err.message || "Some error occurred while saving editor data.",
            });
        else console.log("Editor>>> ", data);
      });

      behaviorData.data.shift();
      let BD = behaviorData.data;
      BD.forEach((d) => d.push(behaviorData.name));
      BehaviorData.create(BD, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while saving behavior data.",
          });
        else console.log("Behavior>>> ", data);
      });

      moleData.data.shift();
      let MD = moleData.data;
      MD.forEach((d) => d.push(moleData.name));
      MoleData.create(MD, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while saving Mole data.",
          });
        else console.log("Mole>>> ", data);
      });

      eyeData.data.shift();
      let EYD = eyeData.data;
      EYD.forEach((d) => d.push(eyeData.name));
      EyeData.create(EYD, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while saving Eye data.",
          });
        else console.log("Eye>>> ", data);
      });

      res.status(201).json({ data: recordData });
    }
  });
};

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
