require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/users')


const app = express();

app.use('/users', userRoutes);

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