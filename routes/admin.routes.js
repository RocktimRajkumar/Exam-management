module.exports = app => {
    const admin = require("../controllers/admin.controller");


    // Retrieve all Customers
    app.get("/admin", admin.findAll);
    app.post("/admin", admin.create);

};
