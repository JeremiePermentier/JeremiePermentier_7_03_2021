const models = require("../models");
const fs = require("fs");

exports.getAllMessages = (req, res, next) => {
    models.Message.findAll({
        attributes: ["id", "userId", "message", "imageUrl", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
            {
                model: models.User,
                attributes: ["pseudo", "id", "avatar"],
            },
            {
                model: models.Like,
                attributes: ["userId"],
            },
            {
                model: models.Comment,
                attributes: ["id", "userId", "comment"],
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: models.User,
                        attributes: ["avatar", "pseudo"],
                    }
                ]
            }
        ]
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json(error))
};

exports.getMessage = (req, res, next) => {
    models.Message.findOne({
        attributes: ["id", "userId", "message", "imageUrl", "createdAt"],
        include: [
            {
                model: models.User,
                attributes: ["pseudo", "id", "avatar"],
            },
            // {
            //     model: models.Like,
            //     attributes: ["userId"],
            // },
            // {
            //     model: models.Comment,
            //     attributes: ["id", "userId", "comment"],
            //     order: [["createdAt", "DESC"]],
            //     include: [
            //         {
            //             model: models.User,
            //             attributes: ["avatar", "pseudo"],
            //         }
            //     ]
            // }
        ]
    })
    .then(message => res.status(200).json(message))
    .catch(error => res.status(400).json(error))
};

exports.createMessage = (req, res, next) => {
    //params
    let message = req.body.message;
    let userId = req.body.userId;
    if(message){
        console.log(userId)
        let newMsg = models.Message.create({
            message: message,
            UserId: userId
        })
    } else {
        console.log("pas de message")
    }
};

exports.likeMessage = (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.id;
    const user = models.Like.findOne({
        where: { userId: userId, messageId: messageId}
        .then(() => {
            if (user){
                models.Like.destroy(
                    { where: { userId: userId, messageId: messageId}},
                );
                res.status(200).send({ msg: "Vous n'aimez plus ce message"})
            } else {
                models.Like.create({
                    userId: userId,
                    messageId: messageId,
                });
                res.status(201).json({ msg: "Vous aimez ce message" });
            }
        })
        .catch((error) => {
            return res.status(400).send(error);
        })
    });
    
};

exports.addComment = (req, res, next) => {
    
};

exports.updateMessage = (req, res, next) => {
    
};

exports.updateComment = (req, res, next) => {
    
};

exports.deleteComment = (req, res, next) => {
    
};

exports.deleteMessage = (req, res, next) => {
    
};