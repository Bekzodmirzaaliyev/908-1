const express = require('express');
const app = express();
app.use(express.json());

// GET request to root URL
app.get('/', (req, res) => {
    res.send('Hello World');
});

// POST request to handle JSON payload
app.post('/data', (req, res) => {
    const data = req.body;
    res.send(`You sent: ${JSON.stringify(data)}`);
});

app.listen('8000', () => {
    console.log('Server is running on port 8000');
});
