module.exports = app => {
    const marksheet = require("../controllers/mark_sheet.controller");


    // All operations related to marksheet
    app.get("/marksheet", marksheet.findAll);
    app.post("/marksheet", marksheet.create);
    app.put("/marksheet/:id", marksheet.update);
    app.get("/marksheet/:id", marksheet.find);
    app.get("/marksheet/:stud_id/sub/:sub_id", marksheet.student_sub_mark);
    app.get("/marksheet/:stud_id/sem/:sem_no", marksheet.student_sem_marksheet);
    app.get("/marksheet/:stud_id/report", marksheet.student_marksheet);
};
