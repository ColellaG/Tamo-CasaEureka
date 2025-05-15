const db = require('../config/database');

// Obtener todas las categorías
const getCategories = (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Obtener una categoría por ID
const getCategoryById = (req, res) => {
  db.get('SELECT * FROM categories WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(row);
  });
};

// Crear una nueva categoría
const createCategory = (req, res) => {
  const { name, description } = req.body;
  db.run('INSERT INTO categories (name, description) VALUES (?, ?)', 
    [name, description], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ 
        id: this.lastID, 
        name, 
        description 
      });
    }
  );
};

// Actualizar una categoría
const updateCategory = (req, res) => {
  const { name, description } = req.body;
  db.run('UPDATE categories SET name = ?, description = ? WHERE id = ?', 
    [name, description, req.params.id], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
      res.json({ 
        id: req.params.id, 
        name, 
        description 
      });
    }
  );
};

// Eliminar una categoría
const deleteCategory = (req, res) => {
  db.run('DELETE FROM categories WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
}; 