const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    student_id: {
        type: Number,
        required: true,
        unique: true
    },
    s_name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    district: String,
    city: String,
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    gender: {
        type: String
    },
    dob: {
        type: Date
    },
    dept_id: {
        type: Number,
        required: true
    },
    batch: String,
    rollno: {
        type: Number,
        required: true,
    },
    password: {
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

module.exports = mongoose.model('Student', StudentSchema);

