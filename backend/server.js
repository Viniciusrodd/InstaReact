
// libs
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// variables
const app = express();
const port = process.env.PORT;

// json config/form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors({ 
    credentials: true,
    origin: `http://localhost:${process.env.FRONT_PORT}` 
}));

// upload files directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// db connection
require('./config/db');

// routes
const router = require('./Routes/Router');
const exp = require('constants');
app.use('/', router);

// open server
app.listen(port, () =>{
    console.log(`App running at port: ${port}`);
});