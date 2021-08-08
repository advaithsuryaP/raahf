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

exports.getBook = (req, res, next) => {
    Book.findById(req.params.id)
    .then(document => {
        if(document) res.status(200).json({ message: 'Book fetched successfully', fetchedBook: document })
        else res.status(404).json({ message: 'Book not found!', fetchedBook: null })
    }); 
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
        isBookLiked: req.body.isBookLiked,
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

exports.updateBook = (req, res, next) => {
    const book = new Book({
        _id: req.body.bookId,
        bookCategory: req.body.bookCategory,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookTimeline: req.body.bookTimeline,
        bookDescription: req.body.bookDescription,
        bookImage: req.body.bookImage,
        bookStatus: req.body.bookStatus,
        isBookLiked: req.body.isBookLiked,
        chapters: req.body.chapters
    });
    Book.updateOne({ _id: req.params.id }, book)
    .then((result) => {
        res.status(200).json({ message: 'Book updated in library!' }) 
    })
};

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
    .then((result) => {
        res.status(200).json({ message: 'Book removed from library!' }); 
    });
};

exports.toggleFavouriteForBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.updateOne({ _id: bookId }, [
        {$set: {isBookLiked: {$eq: [false, "$isBookLiked"]}}}
    ])
    .then((result) => {
        res.status(200).json({ message: 'Favourites toggled successfully' });
    });
};