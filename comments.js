// Create web server
const express = require('express');
const app = express();
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle comments
app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    if (!comment) {
        return res.status(400).send('Comment is required');
    }

    // Save comment to a file
    fs.appendFile('comments.txt', comment + '\n', (err) => {
        if (err) {
            return res.status(500).send('Error saving comment');
        }
        res.status(200).send('Comment saved successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});