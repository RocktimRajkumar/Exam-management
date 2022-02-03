const course = require("../services/course.services");


// Create and Save a new course
exports.create = async (req, res) => {
    try {
        response = await course.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all course from the database.
exports.findAll = async (req, res) => {
    try {
        response = await course.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update course with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await course.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific course by id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await course.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};