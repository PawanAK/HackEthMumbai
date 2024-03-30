// app.js

const express = require('express')
// import { uploadFile, sendMessage, joinGroup, broadcastMessage, transfer, getResults } 
const { uploadFile, sendMessage, joinGroup, transfer, getResults, broadcastMessage }
    = require('./route.js')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;
    await sendMessage(message);
    res.send('Message sent successfully');
});

app.post('/api/join-group', async (req, res) => {
    await joinGroup();
    res.send('Joined group successfully');
});

app.post('/api/broadcast-message', async (req, res) => {
    const { message } = req.body;
    await broadcastMessage(message);
    res.send('Message broadcasted successfully');
});

app.post('/api/transfer', async (req, res) => {
    const { recipient, quantity } = req.body;
    await transfer(recipient, quantity);
    res.send('Transfer completed successfully');
});

app.get('/api/results', async (req, res) => {
    await getResults();
    res.send('Results retrieved successfully');
});

app.post('/api/upload', async (req, res) => {
    // Assuming you're sending a file in the request body
    const file = req.file;
    await uploadFile(file);
    res.send('File uploaded successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
