require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/user');
const categoryRoutes = require('./src/routes/category');
const productRoutes = require('./src/routes/product');


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(expressValidator());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

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