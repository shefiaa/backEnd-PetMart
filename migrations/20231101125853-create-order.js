'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'userId harus berupa angka bulat.',
          },
          min: {
            args: [1],
            msg: 'userId harus lebih besar dari 0.',
          },
        },
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'productId harus berupa angka bulat.',
          },
          min: {
            args: [1],
            msg: 'productId harus lebih besar dari 0.',
          },
        },
        references: {
          model: 'Products',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Kuantitas harus berupa angka bulat.',
          },
          min: {
            args: [1],
            msg: 'Kuantitas harus lebih besar dari 0.',
          },
        },
      },
      totalPrice: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
