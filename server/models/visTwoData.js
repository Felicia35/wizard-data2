const sql = require("./db.js");

// constructor
const VisTwo = function (visTwoData) {
    this.timestamp = visTwoData.timestamp;
    this.gaze_event_duration = visTwoData.gaze_event_duration;
    this.focus = visTwoData.focus;
    this.modified_X = visTwoData.modified_X;
    this.modified_Y = visTwoData.modified_Y;
    this.clientX = visTwoData.clientX;
    this.clientY = visTwoData.clientY;
    this.innerHTML = visTwoData.innerHTML;
    this.anchor = visTwoData.anchor;
    this.horizontal = visTwoData.horizontal;
    this.vertical = visTwoData.vertical;
    this.distance = visTwoData.distance;
    this.angle = visTwoData.angle;
    this.event  = visTwoData.event;
    this.recordName = visTwoData.recordName;
};

VisTwo.createOne = (visTwoData, result) => {
    console.log('two - data: ', visTwoData)
    sql.query(
        "INSERT INTO visualize_two (timestamp, gaze_event_duration, focus, modified_X, modified_Y, clientX, clientY, innerHTML, anchor, horizontal, vertical, distance, angle, event, recordName) VALUES ?",
        [visTwoData],
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

VisTwo.getAllTwo = (recordName, result) => {
    sql.query(`SELECT * FROM visualize_two WHERE recordName='${recordName}'`, (err, res) => {
        if (err) {
            console.error(err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


module.exports = VisTwo;
