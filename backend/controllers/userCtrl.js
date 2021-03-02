const bcrypt = require('bcrypt');
let jwtUtils = require('../utils/jwt.utils')
const models = require('../models');


exports.signup = async (req, res) => {
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
            'userId': newUser.id
          })
        })
        .catch(function(err){
          return res.status(500).json({ 'error': 'cannot add user' });
        })
      });
    } else {
      return res.status(409).json({ 'error': 'user already exist'});
    }
  })
  .catch(function(err){
    return res.status(500).json({ 'error': 'unable to verify user'});
  });

};
exports.login = async (req, res) => {
  //params
  let email = req.body.email;
  let pseudo = req.body.pseudo;
  let password = req.body.password;

  if (email == null || password == null){
    return res.status(400).json({ 'error': 'missing parameters'})
  }

  models.User.findOne({
    where: { email: email}
  })
  .then(function(userFound){
    if (userFound){
      bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
        if(resBycrypt){
          return res.status(200).json({
            'userId': userFound.id,
            'token': jwtUtils.generateTokenForUser(userFound)
          });
        } else {
          return res.status(403).json({ "error": "invalid password"})
        }
      })
    } else {
      return res.status(404).json({ 'error': 'user not exist in db'});
    }
  })
  .catch(function(err){
    return res.status(500).json({ 'error': 'unable to verify user'});
  })
  

};
exports.getUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { id: req.params.id}
    });
    res.status(200).send(user);
  } catch (error){
    return res.status(500).send({ error : "Erreur serveur"})
  }
};
exports.updateUser = async (req, res) => {
  
};
exports.deleteUser = async (req, res) => {
  
};