const { Product, Order } = require('../models'); // Sesuaikan dengan model Anda

// Membuat produk baru
exports.create = async (req, res) => {
  try {
    const { name, description, price, userId } = req.body;
    const newProduct = await Product.create({
      name,
      description,
      price,
      userId,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Gagal membuat produk', error: error.message });
  }
};

// Mendapatkan daftar produk
exports.retrieve = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil produk', error: error.message });
  }
};

// Mengupdate produk berdasarkan ID
  exports.update = async (req, res) => {
    try {
      const productId = req.query.id;
      const { name, description, price } = req.body;
  
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
  
      // Melakukan pembaruan data produk
      if (name) {
        product.name = name;
      }
      if (description) {
        product.description = description;
      }
      if (price) {
        product.price = price;
      }
  
      await product.save();
  
      return res.status(200).json(product);
    } catch (error) {
      console.error(`Error: ${error}`);
      return res.status(500).json({ message: 'Kesalahan server internal' });
    }
  };
// Menghapus produk berdasarkan ID
exports.delete = async (req, res) => {
  const productId = req.query.id;

  try {
    const productToDelete = await Product.findByPk(productId);

    if (!productToDelete) {
      return res.status(404).json({ message: "Produk tidak ditemukan. Tidak ada produk yang dihapus." });
    }

    const deletedProductName = productToDelete.name;

    await productToDelete.destroy();

    return res.status(200).json({ message: `Produk '${deletedProductName}' telah berhasil dihapus` });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "Gagal menghapus produk" });
  }
};
