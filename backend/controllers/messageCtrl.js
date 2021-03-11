const models = require("../models");
const fs = require("fs");

exports.getAllPost = (req, res, next) => {
    
};

exports.getPost = (req, res, next) => {
    
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