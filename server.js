import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
const baseUrl = '/api/v1';

app.get('/', (req, res) => res.send({ msg: 'App: Contact Keeper' }));

// Define routes
app.use(`${baseUrl}/users`, require('./routes/users'));
app.use(`${baseUrl}/auth`, require('./routes/auth'));
app.use(`${baseUrl}/contacts`, require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
