const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require("../middleware/token");
const models = require('../models');
const fs = require("fs");


exports.signup = (req, res, next) => {
  let email = req.body.email;
  let pseudo = req.body.pseudo;
  let password = req.body.password;

  if (email === null || pseudo === null || password === null){
    return res.status(400).json({ 'error': 'missing parameters'})
  }

  models.User.findOne({
    attributes: ['email'],
    where: { email: email}
  })
  .then(function(userFound){
    if(!userFound){
      bcrypt.hash(password, 10, function(err, bcryptedPassword){
        let newUser = models.User.create({
          email: email,
          pseudo: pseudo,
          password: bcryptedPassword,
          isAdmin: 0
        })
        .then(function(newUser){
          return res.status(201).json({
            'userId': newUser.id,
            'pseudo': newUser.pseudo
          })
        })
        .catch(function(err){
          return res.status(500).json({ 'error': 'cannot add user' });
        })
      });
    } else {
      return res.status(409).json({ 'error': 'Email déjà utilisé'});
    }
  })
  .catch(function(err){
    return res.status(500).json({ 'error': 'unable to verify user'});
  });
};
exports.login = (req, res, next) => {
  models.User.findOne({
    where: { email: req.body.email}
  })
  .then(user => {
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, user.password)
      .then(valid => {
          if (!valid){
              return res.status(401).json({ error: 'Mot de passe incorrect !'});
          }
          res.status(200).json({
              userId: user.id,
              pseudo: user.pseudo,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                  {userId: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
              )
          });
      })
      .catch(error => res.status(500).json({ error}));
  })
  .catch(error => res.status(500).json({ error}));
};

exports.getUser = async (req, res, next) => {

  try {
    const userId = token.getUserId(req);
    const ctrlAdmin = await models.User.findOne(
      {
          where: {id: userId},
      }
    )
    const user = await models.User.findOne({
      where: { id : req.params.id },
      include: [
        {
          model: models.Message,
          attributes: ["id", "title", "message", "createdAt"],
        },
        {
          model: models.Comment,
          attributes: ["id", "pseudo" ,"comment", "createdAt"],
        }
      ],
      order: [
        [ models.Comment, "createdAt", "DESC" ],
        [ models.Message, "createdAt", "DESC" ]
      ]
    });
    if(userId === user.id || ctrlAdmin.isAdmin === true){
      res.status(200).send(user);
    } else {
      res.status(401).send({ error: "Vous n'êtes pas autorisé"});
    }
  } catch (error) {
    res.status(500).send({ error: "Erreur du serveur"})
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const userId = token.getUserId(req);
    const ctrlAdmin = await models.User.findOne({where: {id: userId}})
    if (ctrlAdmin.isAdmin === true){
      const user = await models.User.findAll({
        attributes: ["id", "pseudo", "email", "isAdmin", "createdAt"],
        include: [
          {
            model: models.Message,
            attributes: ["id", "title", "message", "createdAt"],
          },
          {
            model: models.Comment,
            attributes: ["id",  "pseudo" ,"comment", "createdAt"],
          }
        ],
        order: [
          [ models.Comment, "createdAt", "DESC" ],
          [ models.Message, "createdAt", "DESC" ]
        ]
      });
      res.status(200).send(user)
    } else {
      res.status(401).send({ error: "Vous n'êtes pas autorisé"});
    }
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.updateUser = async (req, res, next) => {

  try {
    const userId = token.getUserId(req);
    const user = await models.User.findOne(
      {
        where: { id: userId},
        attributes: ["id", "pseudo", "bio", "avatar", "createdAt"],
      });
      if(userId === user.id){
        let avatar;
        if(req.file){
          avatar =  `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
          if(user.avatar){
            const filename = user.avatar.split("/img/")[1];
            fs.unlink(`img/${filename}`, (err) => {
                if (err) console.log(err);
                else {
                    console.log(`Fichier supprimé: img/${filename}`)
                }
            });
          }
        }
        if(req.body.bio){
          user.bio = req.body.bio;
        }
        if(req.body.pseudo){
          user.pseudo = req.body.pseudo;
        }
        user.avatar = avatar;
        const updateUser = await user.save({
            fields: [ "bio", "pseudo", "avatar"]
        })
          res.status(200).send({ message: "Votre messsage à àété modifié" })
        } else {
          res.status(401).json({ message: "Vous n'êtes pas autorisé à modifié ce message" })
        }
  } catch (error) {
    res.status(500).send({ error: "Erreur serveur"});
  }

};
exports.deleteUser = async (req, res) => {
  try {
    const userId = await token.getUserId(req);
    const ctrlAdmin = await models.User.findOne(
      {
          where: {id: userId},
      }
    )
    const user = await models.User.findOne(
      {
        where: { id: req.params.id},
        attributes: ["id", "pseudo", "bio", "avatar", "createdAt"],
      });
      if(userId === user.id || ctrlAdmin.isAdmin === true){
        if(user.avatar !== null){
              const filename = user.avatar.split('/img/')[1];
              fs.unlink(`img/${filename}`, () => {
              models.User.destroy({ where: { id: req.params.id } });
              res.status(200).json({ msg: "Utilisateur supprimé" });
              });
            } else {
              models.User.destroy({ where: { id: req.params.id } });
              res.status(200).json({ msg: "Utilisateur supprimé" });
            }
      } else {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimé cette utilisateur" })
      }
  } catch (error) {
    res.status(500).send({ error: "Erreur serveur"});
  }
};