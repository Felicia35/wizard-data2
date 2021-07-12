const sql = require("./db.js");

// constructor
const VisOne = function (data) {
    this.type = data.type;
    this.value = data.value;
    this.timestamp = data.timestamp;
    this.start = data.start;
    this.end = data.end;
    this.recordName = data.recordName;
};

VisOne.createOne = (visOneData, result) => {
    // console.log(visOneData)
    sql.query(
        {
            sql: 'INSERT INTO visualize_one (type, value, timestamp, start_time, end_time, recordName) VALUES ?',
            values: [visOneData]
        },
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

VisOne.getAllOne = (recordName, result) => {
    sql.query(`SELECT * FROM visualize_one WHERE recordName='${recordName}'`, (err, res) => {
        if (err) {
            console.error(err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};


module.exports = VisOne;
