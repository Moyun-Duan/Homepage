const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const dataFilePath = path.join(__dirname, 'forum-data.json');

// Helper function to read data from the JSON file
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

// Helper function to write data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// API to get all posts
app.get('/api/posts', (req, res) => {
    const posts = readData();
    res.json(posts);
});

// API to create a new post
app.post('/api/posts', (req, res) => {
    const posts = readData();
    const newPost = {
        id: Date.now(),
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        timestamp: new Date().toISOString()
    };
    posts.push(newPost);
    writeData(posts);
    res.status(201).json(newPost);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
