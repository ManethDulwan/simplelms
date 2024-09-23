// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./controllers/studentController');

const app = express();
const PORT = 5058;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://manethdu:HPij2nqqTfyxxOp8@cluster0.mrwjc.mongodb.net/studentDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/add', studentRoutes.addStudent);
app.get('/get', studentRoutes.getStudents);
app.post('/update', studentRoutes.updateStudent);
app.post('/delete', studentRoutes.deleteStudent);
app.post('/search', studentRoutes.searchStudentsByName);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
