const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Mengimpor koneksi ke database

const app = express();
app.use(bodyParser.json());

// 1. Get All Products
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results); // Mengirim data produk sebagai response
  });
});

// 2. Create Product
app.post('/products', (req, res) => {
  const { kode, nama, harga, is_ready, gambar, category_id } = req.body;
  const sql = 'INSERT INTO products (kode, nama, harga, is_ready, gambar, category_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [kode, nama, harga, is_ready, gambar, category_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
});

// 3. Update Product
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { kode, nama, harga, is_ready, gambar, category_id } = req.body;
  
    const sql = `
      UPDATE products 
      SET kode = ?, nama = ?, harga = ?, is_ready = ?, gambar = ?, category_id = ? 
      WHERE id = ?
    `;
  
    db.query(sql, [kode, nama, harga, is_ready, gambar, category_id, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json({ id, kode, nama, harga, is_ready, gambar, category_id, message: "Product updated successfully" });
      }
    });
  });
  

// 4. Delete Product
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(204).send(); // Status 204 untuk menandakan bahwa data dihapus
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
