const mark = require("../services/mark_sheet.services");


// Create and Save a new mark
exports.create = async (req, res) => {
    try {
        response = await mark.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all mark from the database.
exports.findAll = async (req, res) => {
    try {
        response = await mark.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update mark with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await mark.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific mark by id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await mark.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Get student marks for a subject
exports.student_sub_mark = async (req, res) => {
    try {
        stud_id = req.params.stud_id;
        sub_id = req.params.sub_id;
        response = await mark.student_sub_mark(stud_id, sub_id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Get Student marksheet for a semester
exports.student_sem_marksheet = async (req, res) => {
    try {
        stud_id = req.params.stud_id;
        sem_no = req.params.sem_no;
        response = await mark.student_sem_marksheet(stud_id, sem_no);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};
// Get Student marksheet
exports.student_marksheet = async (req, res) => {
    try {
        stud_id = req.params.stud_id;
        response = await mark.student_marksheet(stud_id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};