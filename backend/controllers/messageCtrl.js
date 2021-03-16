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
        where: { id: req.params.id },
        attributes: ["id", "userId", "message", "imageUrl", "createdAt"],
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
    .catch(error => res.status(400).send(error))
};

exports.createMessage = (req, res, next) => {
    //params
    const message = req.body.message;
    const userId = req.body.userId;
    const imageUrl = null;

    if(req.file){
        imageUrl = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    }

    models.Message.create({
        message: message,
        UserId: userId,
        imageUrl: imageUrl
    })
    .then(() => res.status(201).send({msg: "Votre message à été crée"}))
    .catch((error) => res.status(400).send(error))
};

exports.likeMessage = (req, res, next) => {
    const userId = req.body.userId;
    const messageId = req.params.id;
    models.Like.findOne({
        where: { userId: req.body.userId, messageId: req.params.id}
    })
    .then(user => {
        if (user){
            models.Like.destroy(
                { where: { UserId: req.body.userId, MessageId: req.params.id}},
            );
            res.status(200).send({ msg: "Vous n'aimez plus ce message"})
        } else {
            models.Like.create({
                UserId: req.body.userId,
                MessageId: req.params.id,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        }
    })
    .catch((error) => {
        return res.status(400).send(error);
    })
};

exports.addComment = (req, res, next) => {
    const comment = req.body.comment;
    const pseudo = req.body.pseudo;
    const userId = req.body.userId;
    const messageId = req.params.id;

    
    models.Comment.create({
        comment: comment,
        pseudo: pseudo,
        UserId: userId,
        MessageId: messageId
    })
    .then(() => res.status(201).send({msg: "Votre commentaire à été posté"}))
    .catch((error) => res.status(500).send(error))
};

exports.updateMessage = (req, res, next) => {
    
};

exports.updateComment = (req, res, next) => {
    
};

exports.deleteComment = (req, res, next) => {
    models.Comment.destroy({
        where: {id: req.params.id }
    })
    .then(() => res.status(200).send({msg: "Votre commentaire à bien été supprimé"}))
    .catch((error) => res.status(400).send({error}) )
};

exports.deleteMessage = (req, res, next) => {
    
    const message = models.Message.findOne({
        where: {id: req.params.id}
    })
    if(message.imageUrl){
        const filename = post.imageUrl.split("/img")[1];
        fs.unlink(`img/${filename}`, () => {
          models.Message.destroy({ where: { id: message.id } });
          res.status(200).json({ message: "Post supprimé" });
        });
    } else {
        models.Message.destroy({
            where: {id: req.params.id}
        })
        .then(() => res.status(201).send({msg: "Votre message à été supprimé"}))
        .catch((error) => res.status(400).send(error))
    }
};