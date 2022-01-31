module.exports = app => {
    const student = require("../controllers/student.controller");


    // Retrieve all Customers
    app.get("/student", student.findAll);
    app.post("/student", student.create);
    app.put("/student/:id", student.update);
    app.get("/student/:id", student.find);
    app.post("/student/login", student.validateUser);

};
