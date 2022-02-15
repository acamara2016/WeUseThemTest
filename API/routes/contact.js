var express = require('express');
var router = express.Router();
const Contact = require('../models/contact');
const User = require('../models/user');
const multer = require('multer');
const VerifyToken = require('../middlewares/authToken');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.get('/:id', async function(req, res, next){
    console.log('fetching contact');
    const {id} = req.params;
    Contact.findById(id)
    .then(contact=>{
        res.json(contact);
    })
    .catch(err=>{
        res.json(err);
    })
});
 
router.post('/add', upload.single('file'), async function(req, res, next) {
    const {phone_number, firstName, lastName, email, userId} = req.body;
    if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
    }
    User.findById(userId)
    .then(user=>{
        const userContactList = [...user.contacts];
        const newContact = new Contact({
            phone_number, 
            firstName: firstName, 
            lastName: lastName, 
            image: req.file.filename,
            email
        });
        newContact.save()
        .then(result=>{
            userContactList.push(result._id);
            user.contacts = userContactList;
            user.save();
            res.json(result);
        })
        .catch(err=>{
            res.json(err);
        })
    })
});
router.put('/edit/:id', upload.single('file'), async function(req, res, next){
    const {id} = req.params;
    const {phone_number, firstName, lastName, email} = req.body;
    console.log(req.body);
    Contact.findById(id)
    .then(contact=>{
        contact.phone_number = phone_number;
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.image = contact.image;
        contact.email = email;
        contact.save()
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            console.log(err);
        })
    })
});

router.post('/share', function(req, res, next){
    const {to, contactId} = req.body;
    User.findById(to)
    .then(user=>{
        const contactList = [...user.contacts];
        contactList.push(contactId);
        user.save()
        .then(result=>{
            res.json(result);
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        res.json({message: "user does not exist"});
    })
});
 
router.delete('/delete/:userId/:id',  function(req, res, next){
    const {userId, id} = req.params;
    User.findById(userId)
    .then(user=>{
        const userContactList = [...user.contacts];
        const updatedContactList = userContactList.filter(c=>c!==id);
        user.contacts = updatedContactList;
        user.save();
    })
    .catch(err=>{
        console.log(err);
    });
    Contact.findByIdAndDelete(id)
    .then(onfullfilled=>{
        res.status(200).json({message:"deleted"});
    })
    .catch(error=>{
        res.status(401).json({error:'Could not delete the contact'});
    })
});

 

module.exports = router;