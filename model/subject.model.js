const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({
    sub_id: {
        type: Number,
        required: true,
        unique: true
    },
    sub_name: {
        type: String,
        required: true
    },
    semester_id: {
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

module.exports = mongoose.model('Subject', SubjectSchema);

