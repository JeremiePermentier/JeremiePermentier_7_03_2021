const models = require("../models");
const token = require("../middleware/token");
const jwt = require('jsonwebtoken');

exports.likeMessage = (req, res, next) => {
    const userId = token.getUserId(req);
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
        return res.status(500).send(error);
    })
};