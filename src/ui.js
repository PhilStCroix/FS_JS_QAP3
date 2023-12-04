const express = require('express');
const router = express.Router();

const pg = require('pg');
const { Pool } = pg;
const pool = new Pool({    
    user: 'postgres',
    host: 'localhost',
    database: 'QAP3',
    password: 'Olivia2021',
    port: 5432,
});

// Display the list of books
router.get('/', async (req, res) => {
    const result = await pool.query('SELECT title, author_id, genre_id, publication_year, isbn FROM books ORDER BY book_id ASC');
    const books = result.rows;
    res.render('index.ejs', { books });
  });
  
  // Display details of a specific book
  router.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
    const book = result.rows[0];
    res.render('show.ejs', { book });
  });
  
  // Display the form to edit a book
  router.get('/books/:id/edit', async (req, res) => {
    const bookId = req.params.id;
    const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
    const book = result.rows[0];
    res.render('edit.ejs', { book });
  });
  
  // Handle the form submission to add a new book
  router.post('/books', async (req, res) => {
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
      'INSERT INTO books (title, author_id, genre_id, publication_year, isbn) VALUES ($1, $2, $3, $4, $5)',
      [title, author_id, genre_id, publication_year, isbn]
    );
    res.redirect('/');
  });
  
  // Handle the form submission to edit a book
  router.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
      'UPDATE books SET title = $1, author_id = $2, genre_id = $3, publication_year = $4, isbn = $5 WHERE book_id = $6',
      [title, author_id, genre_id, publication_year, isbn, bookId]
    );
    res.redirect('/');
  });
  
  // Handle the form submission to edit a book with partial updates
  router.patch('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
      'UPDATE books SET title = COALESCE($1, title), author_id = COALESCE($2, author_id), genre_id = COALESCE($3, genre_id), publication_year = COALESCE($4, publication_year), isbn = COALESCE($5, isbn) WHERE book_id = $6',
      [title, author_id, genre_id, publication_year, isbn, bookId]
    );
    res.redirect('/');
  });
  
  // Handle the form submission to delete a book
  router.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);
    res.redirect('/');
  });

module.exports = router;