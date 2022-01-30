const sql = require('../utils/db');
const config = require('../config');

// constructor
const Admin = function (admin) {
    this.email = admin.email;
    this.uname = admin.name;
    this.password = admin.pwd;
    this.isactive = admin.isactive;
};


Admin.getAll = result => {
    sql.query("SELECT * FROM admin", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("customers: ", res);
        result(null, res);
    });
};


Admin.create = (newAdmin, result) => {
    sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newAdmin });
        result(null, { id: res.insertId, ...newAdmin });
    });
};



module.exports = Admin;

