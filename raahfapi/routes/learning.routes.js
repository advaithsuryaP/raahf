const express = require('express');
const learningController = require('../controllers/learning.controller');

const router = express.Router();

// GET api/learning/library
router.get('/library', learningController.getBooks);

// GET api/learning/library/id
router.get('/library/:id', learningController.getBook);

// POST api/learning/library
router.post('/library', learningController.addBook);

// PUT api/learning/library/id
router.put('/library/:id', learningController.updateBook);

// DELETE api/learning/library/id
router.delete('/library/:id', learningController.deleteBook);

// POST api/learning/library/id/toggleFavourite
router.put('/library/:bookId/toggleFavourite', learningController.toggleFavouriteForBook)

module.exports = router;