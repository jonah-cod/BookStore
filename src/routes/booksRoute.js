const express = require('express');

const booksrouter = express.Router();
const { getAllBooks } = require('../controllers/booksController');

booksrouter.get('/', getAllBooks);


module.exports = booksrouter;