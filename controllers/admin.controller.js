const admin_service = require("../services/admin.services");


// Create and Save a new Admin
exports.create = async (req, res) => {
    try {
        response = await admin_service.create(req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};


// Retrieve all Admins from the database.
exports.findAll = async (req, res) => {
    try {
        response = await admin_service.findAll()
        res.status(200).send({ "message": response })
    } catch (err) {
        res.status(400).send({ "error": err })
    }

};

// Update Admins with new info.
exports.update = async (req, res) => {
    try {
        id = req.params.id;
        response = await admin_service.update(id, req);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Find specific admin user by email id
exports.find = async (req, res) => {
    try {
        id = req.params.id;
        response = await admin_service.findById(id);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(400).send({ "error": err });
    }
};

// Check Admin login user name and password
exports.validateUser = async (req, res) => {
    try {
        email_id = req.body.email;
        pwd = req.body.pwd;
        response = await admin_service.checkUserNamePwd(email_id, pwd);
        res.status(200).send({ "message": response });
    } catch (err) {
        res.status(401).send({ "error": err });
    }
};