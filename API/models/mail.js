const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
    subject: {
        type: String,
        required: true
    },
    to: {
        type: String,
        ref: 'user',
        required: true
    },
    from: {
        type: String,
        ref: 'user',
        required: true
    },
    content:{
        type:String,
        required: true
    },
    read:{
        type:Boolean,
        required: false,
        default: false
    },
    replies:[{
        type: String,
        required: false,
        ref: 'mail'
    }],
    date:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('mail', mailSchema);