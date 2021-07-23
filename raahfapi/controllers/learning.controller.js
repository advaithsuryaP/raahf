const Book = require('../models/learning/book.model');

exports.getBooks = (req, res, next) => {
    Book.find()
    .then(documents => {
        res.status(200).json({
            message: 'Books fetched from Library!',
            books: documents
        });
    })
};

exports.addBook = (req, res, next) => {
    const book = new Book({
        bookCategory: req.body.bookCategory,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookTimeline: req.body.bookTimeline,
        bookDescription: req.body.bookDescription,
        bookImage: req.body.bookImage,
        bookStatus: req.body.bookStatus,
        chapters: req.body.chapters
    });
    book.save()
    .then(addedBook => {
        res.status(201).json({
            message: 'Book Added to Library!',
            addedBookId: addedBook._id 
        });
    });
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
    .then((result) => {
        res.status(200).json({ message: 'Book removed from library!' }); 
    });
};