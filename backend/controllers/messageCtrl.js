const models = require("../models");
const fs = require("fs");
const jwt = require('jsonwebtoken');

exports.getAllMessages = (req, res, next) => {    

    models.Message.findAll({
        attributes: ["id", "userId", "pseudo", "title", "message", "imageUrl", "createdAt"],
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
        attributes: ["id", "userId", "pseudo", "title", "message", "imageUrl", "createdAt"],
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
    // Récupération userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    //params
    const title = req.body.title;
    const message = req.body.message;
    const pseudo = req.body.pseudo;
    const image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;

    models.Message.create({
        title: title,
        message: message,
        UserId: userId,
        pseudo: pseudo,
        imageUrl: image
    })
    .then(() => res.status(201).send({msg: "Votre message à été crée"}))
    .catch((error) => res.status(400).send(error))
};


exports.updateMessage = (req, res, next) => {
 
};

exports.deleteMessage = (req, res, next) => {


    models.Message.findOne({
        where: {id: req.params.id},
        attributes: ["id", "userId", "pseudo", "title", "message", "imageUrl", "createdAt"],
    })
    .then((msg) => {
        console.log(msg)
        const filename = msg.imageUrl.split("/img/")[1];
        fs.unlink(`img/${filename}`, () => {
        models.Message.destroy({ where: { id: req.params.id }}, {truncate: true });
        res.status(200).json({ message: "Post supprimé" });
        })
    })
    .catch((err) => {
        res.status(400).send(err)
    })
};