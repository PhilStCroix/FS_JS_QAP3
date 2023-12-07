const express = require('express');
const router = express.Router();
const dal = require('./dal');

router.get('/books', async (req, res) => {
  
  console.log('API route reached');
  try {
    const books = await dal.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books via API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

module.exports = router;