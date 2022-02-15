const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone_number: {
      type: Number,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    contacts: [{
      type: String,
      ref: 'contact',
      required: false
    }]
  
  });

module.exports = mongoose.model('user', userSchema);