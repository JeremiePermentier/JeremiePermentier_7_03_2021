const bcrypt = require('bcrypt');
const saltRounds = 10;
let password = "admin";

function createPassword(){
  bcrypt.hash(password, 10, function(err, hash){
    return hash
  })

  // bcrypt.genSalt(saltRounds, function(err, salt){
  //   bcrypt.hash("admin", salt, function(err, hash){
  //     console.log(hash)
  //     return hash
  //   });
  // });
}

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      pseudo: 'Admin',
      email: 'admin@admin.fr',
      password: createPassword(),
      isAdmin: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
