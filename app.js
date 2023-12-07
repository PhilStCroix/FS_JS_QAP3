const express = require('express');
const methodOverride = require('method-override');
const dal = require('./src/dal');
const apiRouter = require('./src/api');
const { getAllAuthors, getAllGenres } = require('./src/dal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/api', apiRouter);

app.get('/', async (req, res) => {
  console.log('Fetching all books');
  try {
    const books = await dal.getAllBooks();
    res.render('index.ejs', { books });
  } catch (error) {
    // Handle error gracefully
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/books/add', async (req, res) => {
  console.log('Fetching all books2');
  try {
    const authors = await getAllAuthors();
    const genres = await getAllGenres();
    res.render('add.ejs', { authors, genres });
  } catch (error) {
    console.error('Error fetching authors and genres:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/books', async (req, res) => {
  console.log('Fetching all books3');
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
  
app.get('/books/:id', async (req, res) => {
  console.log('Fetching all books4');
  const bookId = req.params.id;
  try {
    console.log('Fetching book details for ID:', bookId);
    const book = await dal.getBookById(bookId);
    console.log('Retrieved book:', book);
    if (!book) {
      console.log('Book not found');
      res.status(404).send('Book not found');
      return;
    }
    res.render('show.ejs', { book });
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/books/:id/edit', async (req, res) => {
  console.log('Fetching all books5');
  const bookId = req.params.id;
  try {
    console.log('Fetching book for editing with ID:', bookId);
    const book = await dal.getBookById(bookId);
    console.log('Retrieved book for editing:', book);
    if (!book) {
      console.log('Book not found for editing');
      res.status(404).send('Book not found');
      return;
    }
    res.render('edit.ejs', { book });
  } catch (error) {
    console.error('Error fetching book for editing:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/books', async (req, res) => {
  console.log('Fetching all books6');
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
  console.log('Fetching all books7');
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
  console.log('Fetching all books8');
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
  console.log('Fetching all books9');
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
