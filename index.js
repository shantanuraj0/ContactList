//rendering contact_list using express server

//firing the express server on port 8000
const express = require('express')
const path = require('path');
const port = 8000;

//establish database connection
const db = require('./config/mongoose');

//fetching contact schema
const Contact = require('./models/contact');


//creating a express app /server
//this app has all the functionalities
const app = express(); 


//this will tell express that view engine is ejs
//setting the view engine
//this help to work with dynamic data
app.set('view engine','ejs');


//setting the view path
app.set('views' ,path.join(__dirname , 'views'));


//middle ware
//it reads the form data and parses it in the form of keys,values
app.use(express.urlencoded());


//for handling static files when needed from assets folder
app.use(express.static('assets'));



//controllers
//render it to the browser
//home.ejs will be redndered
app.get('/' , function(req , res){ 
    
    //fetch the contacts
    Contact.find({},function(err , contacts){
        if(err){
            console.log('Error in fecthing contacts from db!');
            return;  
        }

        //render all contacts
        return res.render('home' , {
            title  :"Contact List",
            contact_list : contacts
        });
    });
    
    
});


//data sent by form to the controller
//added parsed data to contact list
app.post('/create-contact', function(req ,res){
    //we can acees form data here
    //console.log(req.body);

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err , newContact){
        if(err){
            console.log("error in creating a new contact!");
            return ;
        }

        console.log('********',newContact);
        return res.redirect('back');
    });

});


//for deleting a contact
app.get('/delete-contact/' , function(req,res){

    //get the id from query in the url
    let id = req.query.id;

    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }

        return res.redirect('back');
    });

    
});


//tell express server to listen on this port
app.listen(port , function(err){
    if(err){
        console.log("Error in running thes server!");
    }
    else{
        console.log("server is running on port : " ,port);
    }
    
});