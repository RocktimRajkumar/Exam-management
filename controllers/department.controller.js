const department = require("../services/department.services");


// Create and Save a new department
exports.create = async (req, res) => {
    try {
        response = await department.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all department from the database.
exports.findAll = async (req, res) => {
    try {
        response = await department.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update department with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await department.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific department by id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await department.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};