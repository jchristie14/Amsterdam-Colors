const express = require('express');
const router = express.Router();

router.get('/', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    res.render('index', {'email': req.session.user.email });
  }
});

module.exports = router;
