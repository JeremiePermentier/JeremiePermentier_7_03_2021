const models = require("../models");
const token = require("../middleware/token");
const fs = require("fs");
const jwt = require('jsonwebtoken');

exports.getAllMessages = async (req, res, next) => {    
    try {
        const msg = await models.Message.findAll({
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
        });
        res.status(200).send(msg)
    } catch (error) {
       return res.status(500).send(error)
    }

};

exports.getMessage = async (req, res, next) => {

    try {
        const msg = await models.Message.findOne({
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
        });
        res.status(200).send(msg)
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.createMessage = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);

        const user = await models.User.findOne({
            where: { id: userId },
            attributes: ["id", "pseudo"]
        });
        if (userId){
            const msg = await models.Message.create({
                title:  req.body.title,
                message: req.body.message,
                pseudo: user.pseudo,
                UserId: user.id,
                imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
            })
            res.status(201).send({ message: "Votre message à été ajouté"})
        } else {
            res.status(400).send({ erreur: "Erreur lors de la requête" })
        }
    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }
};


exports.updateMessage = async (req, res, next) => {


    try {
        const userId = token.getUserId(req);
        const msg = await models.Message.findOne(
            {
                where: { id: req.params.id},
                attributes: ["id", "UserId", "pseudo", "title", "message", "imageUrl", "createdAt"],
            });
            
        if(userId === msg.UserId){
            let newImg;
            if(req.file){
                newImg =  `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
                const filename = msg.imageUrl.split("/img/")[1];
                fs.unlink(`img/${filename}`, (err) => {
                    if (err) console.log(err);
                    else {
                        console.log(`Fichier supprimé: img/${filename}`)
                    }
                });
            }
            if(req.body.message){
                msg.message = req.body.message;
            }
            if(req.body.title){
                msg.title = req.body.title;
            }
            msg.imageUrl = newImg;
            const newMsg = await msg.save({
                fields: [ "title", "message", "imageUrl"]
            })
            res.status(200).send({ message: "Votre messsage à àété modifié" })
        } else {
            res.status(401).json({ message: "Vous n'êtes pas autorisé à modifié ce message" })
        }       

    } catch (error) {
        res.status(500).send({ error: "Erreur serveur"});
    }
};

exports.deleteMessage =  async (req, res, next) => {

    try {
        const userId = token.getUserId(req);
        const ctrlAdmin = await models.User.findOne(
            {
                where: {id: userId},
            }
        )
        const message = await models.Message.findOne(
            {
                where: {id: req.params.id},
                attributes: ["id", "UserId", "pseudo", "title", "message", "imageUrl", "createdAt"],
            });

        if(userId === message.UserId || ctrlAdmin.isAdmin === true){
            const filename = message.imageUrl.split("/img/")[1];
            fs.unlink(`img/${filename}`, () => {
            models.Message.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: "Votre message a été supprimé" });
            })
        } else {
            res.status(401).send("pas autorisé")
        }
    } catch (err) {
        res.status(500).send("erreur serveur")
        console.log(err)
    }

};