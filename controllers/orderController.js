const { Order, Product } = require('../models'); 
// Membuat pesanan baru
exports.create = async (req, res) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body;
    const newOrder = await Order.create({
      userId,
      productId,
      quantity,
      totalPrice,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat pesanan', error: error.message });
  }
};

// Mendapatkan daftar pesanan
exports.retrieve = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil daftar pesanan', error: error.message });
  }
};

// Mendapatkan detail pesanan berdasarkan ID
exports.show = async (req, res) => {
  const orderId = req.query.id;
  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil pesanan', error: error.message });
  }
};

// Mengupdate pesanan berdasarkan ID
exports.update = async (req, res) => {
  const orderId = req.query.id; // Menggunakan req.query.id
  try {
    const [updated] = await Order.update(req.body, {
      where: { id: orderId },
    });
    if (updated) {
      const updatedOrder = await Order.findByPk(orderId);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate pesanan', error: error.message });
  }
};

exports.delete = async (req, res) => {
  const orderId = req.query.id;

  try {
    const orderToDelete = await Order.findByPk(orderId);

    if (!orderToDelete) {
      return res.status(404).json({ message: "Pesanan tidak ditemukan. Tidak ada pesanan yang dihapus." });
    }

    const deletedOrderMessage = orderToDelete.message;

    await orderToDelete.destroy();

    return res.status(200).json({ message: `Pesanan '${deletedOrderMessage}' telah berhasil dihapus` });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Gagal menghapus pesanan" });
  }
};
