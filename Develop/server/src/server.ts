import dotenv from 'dotenv';
import express from 'express';
dotenv.config();


const express = require('express');
// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
// server.js


// In-memory data store (replace with a database if needed)


app.use(express.json());

// API endpoint to receive report data from the client
// TODO: Implement middleware for parsing JSON and urlencoded form data

// TODO: Implement middleware to connect the routes
app.use(routes);

app.post('/api/report', (req, res) => {
    const report = req.body;
    reportData.push(report);
    res.status(200).send('Report received');
  });
  
  // API endpoint to retrieve report data
  app.get('/api/reports', (req, res) => {
    res.json(reportData);
  });
  
  app.listen(3010, () => {
    console.log('Reporting API listening on port 3000');
  });

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
