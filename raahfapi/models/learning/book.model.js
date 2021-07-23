const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    chapterName: { type: String, required: true },
    chapterDescription: { type: String },
    keyPoints: { type: String }
});

const bookSchema = mongoose.Schema({
    bookCategory: { type: String, required: true },
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    bookTimeline: { type: String, required: true },
    bookDescription: { type: String },
    bookImage: { type: String },
    bookStatus: { type: Number },
    chapters: { type: [chapterSchema], default: undefined }
});

module.exports = mongoose.model('Book', bookSchema);