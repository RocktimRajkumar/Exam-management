module.exports = app => {
    const admin = require("../controllers/admin.controller");


    // Retrieve all Customers
    app.get("/admin", admin.findAll);
    app.post("/admin", admin.create);
    app.put("/admin/:id", admin.update);
    app.get("/admin/:id", admin.find);
    app.post("/admin/login", admin.validateUser);

};
