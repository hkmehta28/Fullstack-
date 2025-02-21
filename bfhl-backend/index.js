require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User details (replace with your actual details)
const USER_ID = process.env.USER_ID;
const EMAIL = process.env.EMAIL;
const ROLL_NUMBER = process.env.ROLL_NUMBER;

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        // Find the highest alphabet (case insensitive)
        const highestAlphabet = alphabets.length > 0
            ? [alphabets.reduce((a, b) => (b.toLowerCase() > a.toLowerCase() ? b : a))]
            : [];

        // Response
        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ is_success: false, message: "Internal server error" });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});