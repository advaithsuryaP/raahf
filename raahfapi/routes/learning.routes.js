const express = require('express');
const learningController = require('../controllers/learning.controller');

const router = express.Router();

// GET api/learning/books
router.get('/library', learningController.getBooks);

// POST api/learning/postBook
router.post('/library', learningController.addBook);

// DELETE api/learning/library/id
router.delete('/library/:id', learningController.deleteBook);

module.exports = router;