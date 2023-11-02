'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Produk 1',
        description: 'Deskripsi Produk 1',
        price: 50.00,
        userId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Produk 2',
        description: 'Deskripsi Produk 2',
        price: 75.00,
        userId: 2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
