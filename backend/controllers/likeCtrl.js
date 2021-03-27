const models = require("../models");
const jwt = require('jsonwebtoken');

exports.likeMessage = (req, res, next) => {
    // Récupération userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    const messageId = req.params.id;
    
    models.Like.findOne({
        where: { userId: userId, messageId: messageId},
    })
    .then(user => {
        if (user){
            models.Like.destroy(
                { where: { UserId: userId, MessageId: messageId}},
            );
            res.status(200).send({ msg: "Vous n'aimez plus ce message"})
        } else {
            models.Like.create({
                UserId: userId,
                MessageId: messageId,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        }
    })
    .catch((error) => {
        return res.status(400).send(error);
    })
};