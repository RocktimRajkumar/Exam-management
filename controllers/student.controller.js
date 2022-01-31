const student = require("../services/student.services");


// Create and Save a new Student
exports.create = async (req, res) => {
    try {
        response = await student.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all Student from the database.
exports.findAll = async (req, res) => {
    try {
        response = await student.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update Student with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await student.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific student user by email id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await student.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Check Student login user name and password
exports.validateUser = async (req, res) => {
    try {
        email_id = req.body.email;
        pwd = req.body.pwd;
        response = await student.checkUserNamePwd(email_id, pwd);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};