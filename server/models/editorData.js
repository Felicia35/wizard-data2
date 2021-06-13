const sql = require("./db.js");

// constructor
const Editor = function (text) {
  this.type = text.type;
  this.lastContent = text.lastContent;
  this.newContent = text.newContent;
  this.projectId = text.projectId;
  this.projectName = text.projectName;
  this.username = text.username;
  this.userRole = text.userRole;
  this.timestamp = text.timestamp;
};

Editor.create = ({ editorData }, result) => {
  sql.query("INSERT INTO text_data SET ?", { editorData }, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    result(null, { editorData });
  });
};

Editor.getAll = ({ pid }, result) => {
  sql.query(`SELECT * FROM editor_data WHERE projectId=${pid}`, (err, res) => {
    if (err) {
      console.error(err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Editor;
