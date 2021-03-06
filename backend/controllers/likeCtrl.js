const models = require("../models");
const token = require("../middleware/token");
const jwt = require('jsonwebtoken');

exports.likeMessage = async (req, res, next) => {    
    try {
        const userId = token.getUserId(req);
        const messageId = req.params.id;

        const like = await models.Like.findOne({
            where: { userId: userId, messageId: messageId},
        });

        const dislike = await models.Dislike.findOne({
            where: { userId: userId, messageId: messageId},
        });


        if(!like && !dislike){
            models.Like.create({
                UserId: userId,
                MessageId: messageId,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        } else if (like && !dislike){
            models.Like.destroy(
                { where: { UserId: userId, MessageId: messageId}},
            );
            res.status(200).send({ msg: "Vous n'aimez plus ce message"})
        } else if (!like && dislike){
            models.Dislike.destroy(
                { where: { UserId: userId, MessageId: messageId}},
            );
            models.Like.create({
                UserId: userId,
                MessageId: messageId,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        }


    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }
};