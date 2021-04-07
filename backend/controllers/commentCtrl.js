const models = require("../models");
const jwt = require('jsonwebtoken');
const token = require("../middleware/token");

exports.addComment = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const comment = req.body.comment;
        const messageId = req.params.id;
        const user = await models.User.findOne({ where: { id: userId } });

        if(comment.length < 10){
            res.status(400).send({ msg: "votre commentaire est trop court"})
        } else if (comment.length > 300){
            res.status(400).send({ msg: "votre commentaire est trop long"})
        } else {
            models.Comment.create({
                comment: comment,
                pseudo: user.pseudo,
                UserId: userId,
                MessageId: messageId
            })
            res.status(201).send({msg: "Votre commentaire à été posté"})
        }
    } catch (error){
        return res.status(500).send(error)
    }
};

exports.getAllComments = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const user = await models.User.findOne({ where: { id: userId } });

        if (user.isAdmin ===  true){
            const comments = await models.Comment.findAll({ 
                attributes: ["id", "pseudo", "comment"]
            })
            res.status(200).send(comments)
        } else {
            res.status(401).send({ message: "Vous n'êtes pas autorisé"})
        }

    } catch (error) {
        res.status(500).send(error)
    }
};

exports.updateComment = async (req, res, next) => {
    try {
        const userId = token.getUserId(req);
        const newComment = req.body.comment;
        const comment = await models.Comment.findOne({ where: { id: req.params.id } });

        if (userId == comment.UserId){
            if(newComment.length < 10){
                res.status(400).send({ msg: "votre commentaire est trop court"})
            } else if (newComment.length > 300){
                res.status(400).send({ msg: "votre commentaire est trop long"})
            } else {
                comment.update({ comment: req.body.comment });
                res.status(200).send({msg: "Votre commentaire à bien été modifié"})
            }
        } else {
            res.status(401).json({ message : "Vous n'êtes pas autorisé à supprimé le commentaire"})
        }
    } catch (error) {
        res.status(500).send(err)
    }

};

exports.deleteComment = async (req, res, next) => {
    try{
        const userId = token.getUserId(req);
        const comment = await models.Comment.findOne({ where: { id: req.params.id } });
        const user = await models.User.findOne({ where: { id: userId } });

        if (userId === comment.UserId || user.isAdmin === true){
            models.Comment.destroy({ where: { id: req.params.id } });
            res.status(200).send({msg: "Votre commentaire à bien été supprimé"})
        } else {
            res.status(401).json({ message : "Vous n'êtes pas autorisé à supprimé le commentaire"})
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};