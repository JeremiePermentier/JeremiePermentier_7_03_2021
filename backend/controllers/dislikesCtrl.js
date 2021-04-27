const models = require("../models");
const token = require("../middleware/token");
const jwt = require('jsonwebtoken');

exports.dislikeMessage = async (req, res, next) => {    
    try {
        const userId = token.getUserId(req);
        const messageId = req.params.id;

        const like = await models.Like.findOne({
            where: { userId: userId, messageId: messageId},
        });

        const dislike = await models.Dislike.findOne({
            where: { userId: userId, messageId: messageId},
        });

        if(!dislike && !like){
            models.Dislike.create({
                UserId: userId,
                MessageId: messageId,
            });
            res.status(201).json({ msg: "Vous n'aimez pas ce message" });
        } else if (dislike && !like){
            models.Dislike.destroy(
                { where: { UserId: userId, MessageId: messageId}},
            );
            res.status(200).send({ msg: "Votre dislike a été retiré"})
        } else if (!dislike && like){
            models.Like.destroy(
                { where: { UserId: userId, MessageId: messageId}},
            );
            models.Dislike.create({
                UserId: userId,
                MessageId: messageId,
            });
            res.status(201).json({ msg: "Vous n'aimez pas ce message" });
        }


    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }
};