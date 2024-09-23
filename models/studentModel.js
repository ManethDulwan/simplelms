// models/studentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    grade: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
