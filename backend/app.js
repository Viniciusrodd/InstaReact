
// libs
const express = require('express');
const path = require('path');
const cors = require('cors');

// variables
const app = express();
const port = 5000;

// json config/form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// open server
app.listen(port, () =>{
    console.log(`App running at port: ${port}`);
});