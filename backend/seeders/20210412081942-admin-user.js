'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      pseudo: 'Admin',
      email: 'admin@admin.fr',
      password: '$2b$10$85/1vv4ABTL.gdV9Cs9nuuh24eYiWyAZthn8fPbxmGUPpr3bnGwKe',
      isAdmin: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};