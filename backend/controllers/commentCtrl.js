const models = require("../models");
const jwt = require('jsonwebtoken');
const db = require("../models");

exports.addComment = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const comment = req.body.comment;
        const messageId = req.params.id;
        const pseudo = await models.User.findOne({ where: { id: userId } });

        models.Comment.create({
            comment: comment,
            pseudo: pseudo.pseudo,
            UserId: userId,
            MessageId: messageId
        })
        return res.status(201).send({msg: "Votre commentaire à été posté"})
    } catch (error){
        return res.status(500).send(error)
    }
};

exports.updateComment = (req, res, next) => {
    
    models.Comment.findOne({
        where: {id: req.params.id},
        attributes: ["id", "userId", "comment"]
    })
    .then(comment => {
        let newComment = req.body.comment;

        comment.update({ comment: newComment})
        res.status(201).send({ message: "Votre commentaire a été modifié"})
    })
    .catch(err => res.status(400).send(err))

};

exports.deleteComment = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const comment = await models.Comment.findOne({ where: { id: req.params.id } });

        if (userId == comment.UserId){
            models.Comment.destroy({ where: { id: req.params.id } });
            res.status(200).send({msg: "Votre commentaire à bien été supprimé"})
        } else {
            res.status(400).json({ message : "Vous n'êtes pas autorisé à supprimé le commentaire"})
        }
    } catch (error) {
        return res.status(500).send({ error: "Erreur serveur" });
    }
};