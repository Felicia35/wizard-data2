const sql = require("./db.js");

// constructor
const Mole = function (mole) {
  this.type = mole.type;
  this.point = mole.point;
  this.timestamp = mole.timestamp;
  this.recordName = mole.recordName;
};

Mole.create = (moleData, result) => {
  sql.query(
    "INSERT INTO mole_data (type, point, timestamp, recordName) VALUES ?",
    [moleData],
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

Mole.getAll = ({ pid }, result) => {
  sql.query(
    `SELECT * FROM mole_data WHERE projectId=${pid}`,
    (err, res) => {
      if (err) {
        console.error(err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Mole;
