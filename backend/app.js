const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const msgRoutes = require('./routes/messages');
const likeRoutes = require('./routes/like');
const dislikeRoutes = require('./routes/dislike');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/img', express.static(path.join(__dirname, 'img')));



app.use('/api/users', userRoutes);
app.use('/api/message', msgRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/dislike', dislikeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;