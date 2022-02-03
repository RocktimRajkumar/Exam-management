module.exports = app => {
    const course = require("../controllers/course.controller");


    // All operations related to course
    app.get("/course", course.findAll);
    app.post("/course", course.create);
    app.put("/course/:id", course.update);
    app.get("/course/:id", course.find);
};
