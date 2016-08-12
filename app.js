const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');




app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'rem',
  resave: false,
  saveUnintialized: true,
  cookie: { secure: false }
}));

var pgp = require('pg-promise')();
var db = pgp('postgres://johnchristie@localhost:5432/project_2_test');


// app.get('/gallery', function (req, res){
//   if(!req.session.user){
//     res.redirect('sessions/new');
//   } else {
//     db.one('SELECT * FROM users WHERE id = 10').then(function(data){
//         var user_data = {
//           "users": data
//         };
//         console.log(user_data.users.id)
//      res.render('gallery/gallery.html', {'email': req.session.user.email, user_data });
//     })

//   }
// });  WORKS!!!!!!!!

app.get('/gallery', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    db.one('SELECT * FROM users WHERE id = 10').then(function(data){


     res.render('gallery/gallery.html', {'email': req.session.user.email, data });
    })

  }
});

// app.get('/gallery/gallery/:id', function (req, res){
//   var id = req.session.user;
//   if(!req.session.user){
//     res.redirect('sessions/new');
//   } else {
//     res.render('gallery/gallery.html', {'email':session.user.email });
//   }
// });

app.use(flash());

app.listen(3000, function(){
  console.log('Server up!')
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
