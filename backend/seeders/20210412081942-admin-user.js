'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      pseudo: 'Admin',
      email: 'admin@admin.fr',
      password: '$2b$10$1ao.PlSzxKgZpdRzkM/WtOUR08ibZbd8XvG6j88GtmZuo.DKEVqBO',
      isAdmin: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};