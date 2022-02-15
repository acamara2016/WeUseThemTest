var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/:id', async function(req, res, next){
  const {id} = req.params;
  User.findById(id)
  .populate('contacts')
  .then(user=>{
    console.log(user);
    res.json(user.contacts);
  })
  .catch(err=>{
      res.json(err);
  })
});



module.exports = router;
