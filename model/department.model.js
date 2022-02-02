const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    dept_id: {
        type: Number,
        required: true,
        unique: true
    },
    dept_name: {
        type: String,
        required: true
    },
    dept_code: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Department', DepartmentSchema);

