'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nama produk tidak boleh kosong.'
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Deskripsi produk tidak boleh kosong.'
          }
        }
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Harga produk tidak boleh kosong.'
          },
          isFloat: {
            msg: 'Harga produk harus berupa angka.'
          },
          min: {
            args: [0.01],
            msg: 'Harga produk harus lebih dari 0.01.'
          }
        }
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'userId harus berupa angka bulat.'
          },
          min: {
            args: [1],
            msg: 'userId harus lebih dari 0.'
          }
        }
      },
    },
    {
      sequelize,
      modelName: 'Product',
      hooks: {
        beforeCreate: async (product, options) => {
         
        },
      },
    }
  );

  return Product;
};
