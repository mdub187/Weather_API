import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;
// server.js

// In-memory data store (replace with a database if needed)

app.use(express.static('../client/dist'));

// API endpoint to receive report data from the client

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
