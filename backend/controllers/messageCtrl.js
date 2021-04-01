const models = require("../models");
const token = require("../middleware/token")
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
                attributes: ["id", "userId", "comment", "createdAt"],
                include: [
                    {
                        model: models.User,
                        attributes: ["avatar", "pseudo"],
                    }
                ]
            }
        ]
    })
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error))
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
                attributes: ["id", "userId", "comment", "createdAt"],
                include: [
                    {
                        model: models.User,
                        attributes: ["avatar", "pseudo"],
                    }
                ]
            }
        ],
        order: [
            [ models.Comment, "createdAt", "DESC" ]
        ]
    })
    .then(message => res.status(200).send(message))
    .catch(error => res.status(500).send(error))
};

exports.createMessage = (req, res, next) => {
    const userId = token.getUserId(req);

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
    // const title = req.body.title;
    // const message = req.body.message;
    // const image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;

    models.Message.findOne({
        where: {id: req.params.id},
        attributes: ["id", "userId", "pseudo", "title", "message", "imageUrl", "createdAt"],
    })
    .then(msg => {




        let message = req.body.message;
        let title = req.body.title;
        let imageUrl = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
        // msg.save({
        //     fields: ["title", "message", "imageUrl"]
        // })
        msg.update({ title: title, message: message, imageUrl: imageUrl })
        res.status(201).send({ message: "Votre message a été modifié"})
    })
    .catch(err => res.status(400).send(err))
};

exports.deleteMessage = (req, res, next) => {

    models.Message.findOne({
        where: {id: req.params.id},
        attributes: ["id", "userId", "pseudo", "title", "message", "imageUrl", "createdAt"],
    })
    .then((msg) => {
        const filename = msg.imageUrl.split("/img/")[1];
        fs.unlink(`img/${filename}`, () => {
        models.Message.destroy({ where: { id: req.params.id }});
        res.status(200).json({ message: "Votre message a été supprimé" });
        })
    })
    .catch((err) => {
        res.status(400).send(err)
    })
};