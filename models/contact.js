const mongoose = require('mongoose');

//created the schema
const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    phone : {
        type: String,
        required : true
    }
});

const Contact = mongoose.model('Contact' , contactSchema);

module.exports = Contact;