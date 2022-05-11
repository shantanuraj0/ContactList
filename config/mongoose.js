//connecting to databse

//require the library
const mongoose = require('mongoose');

//connect to the databsse


mongoose.connect('paste your mongo db uri');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error' , console.error.bind(console,'Error in connecting to db'));

//up and running then print the message
db.once('open' , function(){
    console.log('Successfully connected to the database');
});