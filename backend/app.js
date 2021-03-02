const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');

const { sequelize } = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORS - partage de ressources entre serveurs


app.use('/api/users', userRoutes);



module.exports = app;