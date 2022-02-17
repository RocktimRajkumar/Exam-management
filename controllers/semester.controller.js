const semester = require("../services/semester.services");


// Create and Save a new semester
exports.create = async (req, res) => {
    try {
        response = await semester.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all semester from the database.
exports.findAll = async (req, res) => {
    try {
        response = await semester.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update semester with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await semester.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific semester by id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await semester.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};