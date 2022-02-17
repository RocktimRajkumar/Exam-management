const mongoose = require('mongoose');

const SemesterSchema = mongoose.Schema({
    sem_id: {
        type: Number,
        required: true,
        unique: true
    },
    sem_no: {
        type: Number,
        required: true
    },
    course_id: {
        type: Number,
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

module.exports = mongoose.model('Semester', SemesterSchema);

