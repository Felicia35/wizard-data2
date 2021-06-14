const sql = require("./db.js");

// constructor
const Eye = function (eye) {
  this.recording_timestamp = eye.recording_timestamp;
  this.computer_timestamp = eye.computer_timestamp;
  this.event = eye.event;
  this.validity_left = eye.validity_left;
  this.validity_right = eye.validity_right;
  this.mapped_gazepoint_x = eye.mapped_gazepoint_x;
  this.mapped_gazepoint_y = eye.mapped_gazepoint_y;
  this.mapped_eyemovement_type = eye.mapped_eyemovement_type;
  this.mapped_fixation_x = eye.mapped_fixation_x;
  this.mapped_fixation_y = eye.mapped_fixation_y;
  this.eyemovement_type = eye.eyemovement_type;
  this.gaze_event_duration = eye.gaze_event_duration;
  this.fixation_point_x = eye.fixation_point_x;
  this.fixation_point_y = eye.fixation_point_y;
  this.PC = eye.PC;
  this.phone = eye.phone;
  this.focus = eye.focus;
  this.timestamp = eye.timestamp;
  this.recordName = mole.recordName;
};

Eye.create = (eyeData, result) => {
  sql.query(
    "INSERT INTO eye_data (recording_timestamp, computer_timestamp, event, validity_left, validity_right, mapped_gazepoint_x, mapped_gazepoint_y, mapped_eyemovement_type, mapped_fixation_x, mapped_fixation_y, eyemovement_type, gaze_event_duration, fixation_point_x, fixation_point_y, PC, phone, focus, timestamp, recordName) VALUES ?",
    [eyeData],
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

Eye.getAll = ({ pid }, result) => {
  sql.query(`SELECT * FROM eye_data WHERE projectId=${pid}`, (err, res) => {
    if (err) {
      console.error(err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Eye;
