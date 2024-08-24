const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Enable .env variables
dotenv.config();

const app = express();

// Enable CORS for all routes, allowing requests from your client URL
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace this with the specific client URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Define routes without using baseUrl for client URL
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

// Start server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
