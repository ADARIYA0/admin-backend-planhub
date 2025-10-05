const { corsOptions } = require('./src/config/corsOption');
const cors = require("cors");
const express = require('express');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

module.exports = app;
