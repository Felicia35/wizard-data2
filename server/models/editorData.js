const sql = require("./db.js");

// constructor
const Editor = function (editor) {
  this.type = editor.type;
  this.lastContent = editor.lastContent;
  this.newContent = editor.newContent;
  this.projectId = editor.projectId;
  this.projectName = editor.projectName;
  this.username = editor.username;
  this.userRole = editor.userRole;
  this.timestamp = editor.timestamp;
  this.recordName = editor.recordName;
};

Editor.create = (editorData, result) => {
  sql.query("INSERT INTO editor_data (type, lastContent, newContent, projectId, projectName, username, userRole, timestamp, recordName) VALUES ?", 
  [editorData], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    result(null, res);
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
