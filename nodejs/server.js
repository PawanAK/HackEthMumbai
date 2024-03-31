const cors = require('cors')
const express = require('express')
const { uploadFile, sendMessage, joinGroup, transfer, getResults, broadcastMessage, generateWallet }
    = require('./route.js')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/generate-wallet', async (req, res) => {
    try {
        const walletInfo = await generateWallet();
        res.json(walletInfo);
    } catch (error) {
        res.status(500).json({ error: "Error generating wallet" });
    }
});

app.post('/api/send-message', async (req, res) => {
    const { message } = req.body;
    await sendMessage(message);
    res.send('Message sent successfully');
});

// server.js
app.post('/api/add-user', async (req, res) => {
    try {
        const { address } = req.body;
        await addUser(address);
        res.send('User added successfully');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
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
    const file = req.file;
    await uploadFile(file);
    res.send('File uploaded successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
