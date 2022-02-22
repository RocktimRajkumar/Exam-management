const mongoose = require('mongoose');

const MarkSheetSchema = mongoose.Schema({
    mark_id: {
        type: Number,
        required: true,
        unique: true
    },
    student_id: {
        type: Number,
        required: true
    },
    sub_id: {
        type: Number,
        required: true,
    },
    mark: {
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

module.exports = mongoose.model('MarkSheet', MarkSheetSchema);

