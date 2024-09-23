var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const bodyParser = require('body-parser');
var app = Express();
app.use(cors());
app.use(bodyParser.json());

var CONNECTION_STRING = "mongodb+srv://manethdu:HPij2nqqTfyxxOp8@cluster0.mrwjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "lms";
let database;
async function connectToDatabase() {
    try {
        const client = new Mongoclient(CONNECTION_STRING);
        await client.connect();
        database = client.db(DATABASE_NAME);
        console.log("Connected to database:", DATABASE_NAME);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

app.listen(5038, async () => {
    await connectToDatabase();
    console.log("Server is running on port 5038");
});

app.get('/get', async (req, res) => {
    try {
        const collection = database.collection('simple_lms');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});
app.post('/serch', async (req, res) => {
    const {id} = req.body.search;
    try {
        const collection = database.collection('simple_lms');
        const query={id};
        const data = await collection.find(query).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});
app.post('/add', async (req, res) => {

    try {
        database.collection('simple_lms').insertOne({
            id: req.body.id,
            name: req.body.name,
            grade: req.body.grade
        });
        res.json({ message: 'Student added successfully' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'An error occurred while adding the student.' });
    }
});

app.post('/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const grade = req.body.grade;
    if (id == null || name == null || grade == null) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    } else {
        try {
            database.collection('simple_lms').updateOne(
                {id},
                {$set: {name, grade}}
            );
            res.json({ message: 'Student added successfully' });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }
});

app.post('/delete', async (req, res) => {
    const id = req.body.id;
    if (id == null ) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    } else {
        try {
            database.collection('simple_lms').deleteOne(
                {id},
            );
            res.json({ message: 'Student Deleted successfully' });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }
});
