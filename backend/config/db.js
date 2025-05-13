
// libs
const mongoose = require('mongoose');
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

// connection
const connection = async () =>{
    try{
        const dbConnection = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.3ebf5rv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        )
        console.log('MongoDB success connection');
        return dbConnection;
    }
    catch(error){
        console.error('Error at mongoDB connection: ', error);
    };
};

connection();
module.exports = connection