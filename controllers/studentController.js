// controllers/studentController.js
const Student = require('../models/studentModel');

exports.addStudent = async (req, res) => {
    const { id, name, grade } = req.body;

    const newStudent = new Student({ id, name, grade });
    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    const { name, grade } = req.body;
    const studentId = req.body.id;
    try {
        const student = await Student.findOneAndUpdate(
            { id: studentId },
            { name, grade },
            { new: true, runValidators: true } 
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        console.log('Updated student:', student); 
        res.status(200).json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    const studentId = req.body.id; 

    try {
        const student = await Student.findOneAndDelete({ id: studentId }); 

        if (!student) {
            return res.status(404).json({ message: 'Student not found' }); 
        }

        console.log('Deleted student:', student);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error); 
        res.status(500).json({ message: error.message }); 
    }
};

exports.searchStudentsByName = async (req, res) => {
    const  query  = req.body.search; 

    if (!query) {
        return res.status(400).json({ message: 'id query is required.' }); 
    }

    try {
        const students = await Student.find({ id: query }); 

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found.' }); 
        }

        res.status(200).json(students); 
    } catch (error) {
        console.error('Error searching for students:', error); 
        res.status(500).json({ message: error.message }); 
    }
};