module.exports = app => {
    const semester = require("../controllers/semester.controller");


    // All operations related to semester
    app.get("/semester", semester.findAll);
    app.post("/semester", semester.create);
    app.put("/semester/:id", semester.update);
    app.get("/semester/:id", semester.find);
};
