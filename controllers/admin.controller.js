const Admin = require("../model/admin.model");


// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Admin User
    const admin = new Admin({
        email: req.body.email,
        name: req.body.name,
        pwd: req.body.pwd,
        isactive: req.body.active
    });

    // Save Admin in the database
    Admin.create(admin, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Admin."
            });
        else res.send(data);
    });
};



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Admin.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else
            res.send(data);
    });
};