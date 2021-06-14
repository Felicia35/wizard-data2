const sql = require("./db.js");

// constructor
const Behavior = function (behavior) {
  this.projectId = behavior.projectId;
  this.type = behavior.type;
  this.status = behavior.status;
  this.timestamp = behavior.timestamp;
  this.recordName = behavior.recordName;
};

Behavior.create = (behaviorData, result) => {
  sql.query(
    "INSERT INTO behavior_data (projectId, type, status, timestamp, recordName) VALUES ?",
    [behaviorData],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

Behavior.getAll = (recordName, result) => {
    sql.query(`SELECT * FROM behavior_data WHERE recordName='${recordName}'`, (err, res) => {
        if (err) {
            console.error(err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


module.exports = Behavior;
