
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

// routes
const router = require('./Routes/router');
app.use('/', router);

// open server
app.listen(port, () =>{
    console.log(`App running at port: ${port}`);
});