'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Contoh User 1',
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', 10), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Contoh User 2',
        email: 'user2@example.com',
        password: await bcrypt.hash('password456', 10), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
