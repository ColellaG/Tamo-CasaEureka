const db = require('../config/database');

// Obtener todos los productos
const getProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Obtener un producto por ID
const getProductById = (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(row);
  });
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  const { name, description, price, categoryId, imageUrl, isAvailable } = req.body;
  db.run(
    'INSERT INTO products (name, description, price, categoryId, imageUrl, isAvailable) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, categoryId, imageUrl, isAvailable],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        name,
        description,
        price,
        categoryId,
        imageUrl,
        isAvailable
      });
    }
  );
};

// Actualizar un producto
const updateProduct = (req, res) => {
  const { name, description, price, categoryId, imageUrl, isAvailable } = req.body;
  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, categoryId = ?, imageUrl = ?, isAvailable = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [name, description, price, categoryId, imageUrl, isAvailable, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({
        id: req.params.id,
        name,
        description,
        price,
        categoryId,
        imageUrl,
        isAvailable
      });
    }
  );
};

// Eliminar un producto
const deleteProduct = (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
};

// Obtener productos por categoría
const getProductsByCategory = (req, res) => {
  db.all('SELECT * FROM products WHERE categoryId = ?', [req.params.categoryId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
}; 