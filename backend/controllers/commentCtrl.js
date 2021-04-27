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

        if (user.id ===  userId){
            const comments = await models.Comment.findAll({ 
                attributes: ["id", "messageId", "pseudo", "comment"]
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

exports.like = async (req, res, next) => {    
    try {
        const userId = token.getUserId(req);
        const commentId = req.params.id;

        const like = await models.LikeComment.findOne({
            where: { userId: userId, commentId: commentId},
        });

        const dislike = await models.DislikeComment.findOne({
            where: { userId: userId, commentId: commentId},
        });


        if(!like && !dislike){
            models.LikeComment.create({
                UserId: userId,
                CommentId: commentId,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        } else if (like && !dislike){
            models.LikeComment.destroy(
                { where: { UserId: userId, CommentId: commentId}},
            );
            res.status(200).send({ msg: "Vous n'aimez plus ce message"})
        } else if (!like && dislike){
            models.DislikeComment.destroy(
                { where: { UserId: userId, CommentId: commentId}},
            );
            models.LikeComment.create({
                UserId: userId,
                CommentId: commentId,
            });
            res.status(201).json({ msg: "Vous aimez ce message" });
        }


    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }
};

exports.dislike = async (req, res, next) => {    
    try {
        const userId = token.getUserId(req);
        const commentId = req.params.id;

        const like = await models.LikeComment.findOne({
            where: { userId: userId, commentId: commentId},
        });

        const dislike = await models.DislikeComment.findOne({
            where: { userId: userId, commentId: commentId},
        });

        if(!dislike && !like){
            models.DislikeComment.create({
                UserId: userId,
                CommentId: commentId,
            });
            res.status(201).json({ msg: "Vous n'aimez pas ce message" });
        } else if (dislike && !like){
            models.DislikeComment.destroy(
                { where: { UserId: userId, CommentId: commentId}},
            );
            res.status(200).send({ msg: "Votre dislike a été retiré"})
        } else if (!dislike && like){
            models.LikeComment.destroy(
                { where: { UserId: userId, CommentId: commentId}},
            );
            models.DislikeComment.create({
                UserId: userId,
                CommentId: commentId,
            });
            res.status(201).json({ msg: "Vous n'aimez pas ce message" });
        }


    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }
};

exports.getLike = async (req, res, next) => {

    try {
        const userId = token.getUserId(req);
        const commentId = req.params.id;

        const likes = await models.LikeComment.findAll({
            attributes: ["id", "commentId", "userId"],
            order: [["createdAt", "DESC"]],
        })
        res.status(200).json(likes)
    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }

}
exports.getDislike = async (req, res, next) => {

    try {
        const userId = token.getUserId(req);
        const commentId = req.params.id;

        const Dislike = await models.DislikeComment.findAll({
            attributes: ["id", "commentId", "userId"],
            order: [["createdAt", "DESC"]],
        })
        res.status(200).json(Dislike)
    } catch (error) {
        res.status(500).send({ erreur: "Erreur serveur"})
    }

}