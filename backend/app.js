const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/messages');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');

// const { sequelize } = require('./models/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/users', userRoutes);
app.use('/api/message', msgRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;