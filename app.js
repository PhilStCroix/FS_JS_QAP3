const express = require('express');
const methodOverride = require('method-override');
const dal = require('./src/dal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
  try {
    const books = await dal.getAllBooks();
    res.render('index.ejs', { books });
  } catch (error) {
    // Handle error gracefully
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});
  
  app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await dal.getBookById(bookId);
      if (!book) {
        res.status(404).send('Book not found');
        return;
      }
      res.render('show.ejs', { book });
    } catch (error) {
      // Handle error gracefully
      console.error('Error fetching book details:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  app.get('/books/:id/edit', async (req, res) => {
    const bookId = req.params.id;
    try {
      const book = await dal.getBookById(bookId);
      if (!book) {
        res.status(404).send('Book not found');
        return;
      }
      res.render('edit.ejs', { book });
    } catch (error) {
      // Handle error gracefully
      console.error('Error fetching book for editing:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('books/add', (req, res) => {
    res.render('add.ejs');
  });

  app.post('/books', async (req, res) => {
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    try {
      await dal.createBook(title, author_id, genre_id, publication_year, isbn);
      res.redirect('/');
    } catch (error) {
      // Handle error gracefully
      console.error('Error creating book:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    try {
      await dal.updateBook(bookId, title, author_id, genre_id, publication_year, isbn);
      res.redirect('/');
    } catch (error) {
      // Handle error gracefully
      console.error('Error updating book:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.patch('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author_id, genre_id, publication_year, isbn } = req.body;
    try {
      await dal.partiallyUpdateBook(bookId, title, author_id, genre_id, publication_year, isbn);
      res.redirect('/');
    } catch (error) {
      // Handle error gracefully
      console.error('Error partially updating book:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
      await dal.deleteBook(bookId);
      res.redirect('/');
    } catch (error) {
      // Handle error gracefully
      console.error('Error deleting book:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
