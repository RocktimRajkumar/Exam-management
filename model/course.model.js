const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    course_id: {
        type: Number,
        required: true,
        unique: true
    },
    course_name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true,
    },
    course_duration: {
        type: Number,
        required: true,
    },
    dept_id: {
        type: Number,
        required: true,
        unique: true
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

module.exports = mongoose.model('Course', CourseSchema);

