module.exports = app => {
    const subject = require("../controllers/subject.controller");


    // All operations related to subject
    app.get("/subject", subject.findAll);
    app.post("/subject", subject.create);
    app.put("/subject/:id", subject.update);
    app.get("/subject/:id", subject.find);
};
