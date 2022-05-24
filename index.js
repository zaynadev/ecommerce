require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.DATABASE, {})
    .then(() => {
        console.log('db connected')
    })
    .catch(() => {
        console.log('error connecting db')
    });


app.get('/', (req, res) => {
    res.send('Hello world !!!')
})

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`server is running on  http://localhost:${port}`)
});