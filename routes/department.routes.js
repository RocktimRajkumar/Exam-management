module.exports = app => {
    const department = require("../controllers/department.controller");


    // All operations related to department
    app.get("/department", department.findAll);
    app.post("/department", department.create);
    app.put("/department/:id", department.update);
    app.get("/department/:id", department.find);
};
