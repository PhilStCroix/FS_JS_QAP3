const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'QAP3',
  password: 'Olivia2021',
  port: 5432,
});

async function getAllBooks() {
  const result = await pool.query('SELECT * FROM books ORDER BY book_id ASC');
  return result.rows;
}

async function getBookById(bookId) {
  const result = await pool.query('SELECT * FROM books WHERE book_id = $1', [bookId]);
  return result.rows[0];
}

async function createBook(title, author_id, genre_id, publication_year, isbn) {
  await pool.query(
    'INSERT INTO books (title, author_id, genre_id, publication_year, isbn) VALUES ($1, $2, $3, $4, $5)',
    [title, author_id, genre_id, publication_year, isbn]
  );
}

async function updateBook(bookId, title, author_id, genre_id, publication_year, isbn) {
  await pool.query(
    'UPDATE books SET title = $1, author_id = $2, genre_id = $3, publication_year = $4, isbn = $5 WHERE book_id = $6',
    [title, author_id, genre_id, publication_year, isbn, bookId]
  );
}

async function partiallyUpdateBook(bookId, title, author_id, genre_id, publication_year, isbn) {
  await pool.query(
    'UPDATE books SET title = COALESCE($1, title), author_id = COALESCE($2, author_id), genre_id = COALESCE($3, genre_id), publication_year = COALESCE($4, publication_year), isbn = COALESCE($5, isbn) WHERE book_id = $6',
    [title, author_id, genre_id, publication_year, isbn, bookId]
  );
}

async function deleteBook(bookId) {
  await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  partiallyUpdateBook,
  deleteBook,
};