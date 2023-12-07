const express = require('express');
const router = express.Router();
const dal = require('./dal');

// GET all books
router.get('/books', async (req, res) => {
  try {
    const books = await dal.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST create a new book
router.post('/books', async (req, res) => {
  try {
    const newBook = req.body;

    // Validate that the provided author_id and genre_id exist
    const authorExists = await dal.authorExists(newBook.author_id);
    const genreExists = await dal.genreExists(newBook.genre_id);

    if (!authorExists || !genreExists) {
      res.status(400).json({ error: 'Invalid author_id or genre_id' });
      return;
    }

    await dal.createBook(newBook.title, newBook.author_id, newBook.genre_id, newBook.publication_year, newBook.isbn);
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Error adding book via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT update book details
router.put('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = req.body;

    console.log('Received data:', updatedBook);

    // Validate that the provided author_id and genre_id exist
    const authorExists = await dal.authorExists(updatedBook.author_id);
    const genreExists = await dal.genreExists(updatedBook.genre_id);

    if (!authorExists || !genreExists) {
      res.status(400).json({ error: 'Invalid author_id or genre_id' });
      return;
    }

    await dal.updateBook(bookId, updatedBook.title, updatedBook.author_id, updatedBook.genre_id, updatedBook.publication_year, updatedBook.isbn);
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH partially update book details
router.patch('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const partialUpdate = req.body;

    // Validate that the provided author_id and genre_id exist if they are included in the update
    if (partialUpdate.author_id !== undefined) {
      const authorExists = await dal.authorExists(partialUpdate.author_id);
      if (!authorExists) {
        res.status(400).json({ error: 'Invalid author_id' });
        return;
      }
    }

    if (partialUpdate.genre_id !== undefined) {
      const genreExists = await dal.genreExists(partialUpdate.genre_id);
      if (!genreExists) {
        res.status(400).json({ error: 'Invalid genre_id' });
        return;
      }
    }

    await dal.partiallyUpdateBook(bookId, partialUpdate);
    res.json({ message: 'Book partially updated successfully' });
  } catch (error) {
    console.error('Error updating book via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// DELETE a book
router.delete('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    await dal.deleteBook(bookId);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
