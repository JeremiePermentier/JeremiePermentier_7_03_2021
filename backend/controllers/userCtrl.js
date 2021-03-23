const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token = require("../middleware/token");
const models = require('../models');


exports.signup = (req, res, next) => {
  //params
  let email = req.body.email;
  let pseudo = req.body.pseudo;
  let password = req.body.password;

  if (email == null || pseudo == null || password == null){
    return res.status(400).json({ 'error': 'missing parameters'})
  }

  models.User.findOne({
    attributes: ['email'],
    where: { email: email}
  })
  .then(function(userFound){
    if(!userFound){
      bcrypt.hash(password, 5, function(err, bcryptedPassword){
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
      return res.status(409).json({ 'error': 'Pseudo déjà utilisé'});
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

exports.getUser = (req, res, next) => {
  models.User.findOne({
    where: { id : req.params.id }
    .then(user => {
      if (!user){
        return res.status(401).json({ error: 'Utilisateur non trouvé !'})
      } else {
        res.status(200).send(user);
      }
    })
    .catch(error => {
      return res.status(500).send({ error: "Erreur du serveur"})
    })
  })
};
exports.updateUser = (req, res, next) => {
  // models.User.findOne({
  //   where: { id : req.params.id }
  //   .then(user => {
  //     if (user.id === req.params.id){
  //       const userObject = req.file ?
  //       {
  //         ...json.parse(req.body),
  //         avatar: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
  //       } : {...req.body}
  //     }
  //   })
  // })
  const userObject = req.file ?
  {
    ...JSON.parse(req.body.user),
    imageUrl: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
  } : {...req.body};
  models.User.save({id:req.params.id}, {...userObject, id: req.params.id})
  .then(() => res.status(200).json({ message : 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
};
exports.deleteUser = (req, res) => {
  models.User.findOne({
    where: { id: req.params.id}
  })
  .then(user => {
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
  })
  .catch(error => {
    return res.status(500).send({ error: "Erreur serveur"});
  })
};