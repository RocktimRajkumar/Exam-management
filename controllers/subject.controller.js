const semester = require("../services/semester.services");
const subject = require("../services/subject.services");


// Create and Save a new subject
exports.create = async (req, res) => {
    try {
        await semester.validateSemesterId(req.body.semester_id);
        response = await subject.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all subject from the database.
exports.findAll = async (req, res) => {
    try {
        response = await subject.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update subject with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await subject.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific subject by id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await subject.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};