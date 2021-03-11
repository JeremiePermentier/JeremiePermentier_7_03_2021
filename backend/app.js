const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/messages');

// const { sequelize } = require('./models/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/users', userRoutes);
app.use('/api/message', msgRoutes);

module.exports = app;