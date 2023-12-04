const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM books ORDER BY book_id ASC');
    const books = result.rows;
    res.render('index.ejs', { books });
});

router.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
    const book = result.rows[0];
    res.render('show.ejs', { book });
});

router.get('/books/:id/edit', async (req, res) => {
    const bookId = req.params.id;
    const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
    const book = result.rows[0];
    res.render('edit.ejs', { book });
});

router.post('/books', async (req, res) => {
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
        'INSERT INTO books (title, author_id, genre_id, publication_year, isbn) VALUES ($1, $2, $3, $4, $5)',
        [title, author_id, genre_id, publication_year, isbn]
    );
    res.redirect('/');
});

router.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
        'UPDATE books SET title = $1, author_id = $2, genre_id = $3, publication_year = $4, isbn = $5 WHERE book_id = $6',
        [title, author_id, genre_id, publication_year, isbn, bookId]
    );
    res.redirect('/');
});

router.patch('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    await pool.query(
        'UPDATE books SET title = COALESCE($1, title), author_id = COALESCE($2, author_id), genre_id = COALESCE($3, genre_id), publication_year = COALESCE($4, publication_year), isbn = COALESCE($5, isbn) WHERE book_id = $6',
        [title, author_id, genre_id, publication_year, isbn, bookId]
    );
    res.redirect('/');
});

router.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);
    res.redirect('/');
});

module.exports = router;
