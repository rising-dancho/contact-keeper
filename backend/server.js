const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// enable .env variable: "process" is a global object available in node applications
dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;
const baseUrl = '/api/v1';

app.get('/', (req, res) => res.send({ msg: 'App: Contact Keeper' }));

// Define routes
app.use(`${baseUrl}/users`, require('./routes/users'));
app.use(`${baseUrl}/auth`, require('./routes/auth'));
app.use(`${baseUrl}/contacts`, require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// express-validator, what is it for? https://chatgpt.com/share/ee1118bd-4d17-4232-bea4-db50d85467e6
