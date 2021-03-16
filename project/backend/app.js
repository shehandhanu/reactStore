const express = require('express');
const cors = require('cors');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());

//cors handelling 

app.use(cors({
    origin: 'http://localhost:3000'
}))

//Import All Routes

const products = require('./routes/product');
const users = require('./routes/user');
const order = require('./routes/order');


app.use('/api/v1', products);
app.use('/api/v1', users);
app.use('/api/v1', order)

// Middele ware to handle errors

app.use(errorMiddleware)

module.exports = app;