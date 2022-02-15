const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    phone_number:{
        type: Number,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('contact', contactSchema);