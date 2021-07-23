const express = require('express');
const learningRoutes = require('./routes/learning.routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://advaithsurya:wwc43TiLlerb9CUe@cluster0.fzgoe.mongodb.net/raahf?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to MongoDB!');
}).catch(() => {
    console.log('Database connection failed!');
});

const port = process.env.PORT || 3000;

// app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/learning', learningRoutes);

app.listen(port);
