require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/category', categoryRoutes);

mongoose.connect(process.env.DATABASE, {})
    .then(() => {
        console.log('db connected')
    })
    .catch(() => {
        console.log('error connecting db')
    });


const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}`)
});