const VisOneData = require("../../models/visOneData");
const sql = require("../../models/db");

exports.createRecordData = async (req, res) => {
    if (!req.body) res.status(400).send({message: "Content can not be empty!"});

    const {createInfo} = req.body;
    const {visOneData, visTwoData} = createInfo;

    const recordData = {
        recordName: createInfo.recordName,
        recordCreator: createInfo.recordCreator,
        visOneData: visOneData ? visOneData.name : null,
        visTwoData: visTwoData ? visTwoData.name : null,
        timestamp: createInfo.createdAt,
    };

    sql.query('INSERT INTO record_data SET ?', recordData, (err, rd) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while import the Record Data",
            });
        } else {
            console.log("Record>>>", rd);

            if (visOneData) {
                VisOneData.createOne(visOneData.data, (err, data) => {
                    if (err)
                        res
                            .status(500)
                            .send({
                                message:
                                    err.message || "Some error occurred while saving Visualize One Data.",
                            });
                });
            }
        }
    });
};

exports.listRecordData = (req, res) => {
    sql.query(`SELECT * FROM record_data`, (err, sql_res) => {
        if (err) {
            console.error(err);
            res.status(500).send({message: err.message || "Some error occurred while retrieving eye data."});
        } else res.status(200).json({data: sql_res})
    });
};

exports.listAllData = (req, res) => {
    VisOneData.getAllOne(req.params.recordName, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Visualize One Data.",
            });
        else res.status(200).json({data: data});
    });
};
