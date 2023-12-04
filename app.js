const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Database connection
const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'QAP3',
  password: 'Olivia2021',
  port: 5432,
});

// Importing the API routes
const apiRoutes = require('./src/api');
const uiRoutes = require('./src/ui');

// Using the API routes
app.use('/src/api', apiRoutes);
app.use('/src/ui', uiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
