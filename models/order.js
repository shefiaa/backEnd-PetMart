const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      // Asosiasi ke User
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // Asosiasi ke Product
      Order.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      hooks: {
        beforeCreate: async (order) => {
          // Hitung total harga berdasarkan kuantitas dan harga produk
          const product = await sequelize.models.Product.findByPk(order.productId);
          if (!product) {
            throw new Error('Produk tidak ditemukan');
          }
          order.totalPrice = order.quantity * product.price;
        },
      },
    }
  );

  return Order;
};
