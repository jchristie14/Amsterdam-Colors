const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const https = require('https');

require('dotenv').config();
var request = require('request');






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




app.get('/gallery', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    var userNow = req.session.user;
    db.one('SELECT * FROM users WHERE email = $1', [userNow.email]).then(function(data){
     res.render('gallery/gallery.html', {'email': req.session.user.email, data });
    })

  }
});

app.get('/mygallery/:id', function(req, res){
  var id = req.params.id;
  var key = process.env;
  request("https://www.rijksmuseum.nl/api/en/collection/sk-c-5?key="+key+"&format=json&ps=80&", function (error, response, body) {
    if (!error && response.statusCode ==200) {
      var dataPic = JSON.parse(body);
      console.log(Object.keys(dataPic))
      console.log(dataPic.artObject.webImage.url)
 res.render('gallery/mygallery.html', dataPic);
    }

  })
  // res.render('gallery/mygallery.html', data);
});


AJAX request on my own server--a way to answer!!!

// app.get('/mygallery/:id', function(req, res){
//   var id = req.params.id;


// var key = process.env.API_KEY;


// https.get("https://www.rijksmuseum.nl/api/en/collection/sk-c-5?key="+key+"&format=json&ps=80&", (res) => {
//   console.log('statusCode: ', res.statusCode);
//   console.log('headers: ', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });

// }).on('error', (e) => {
//   console.error(e);
// });

//   // db.one('SELECT * FROM apartments WHERE id = $1', [id]).then(function(data){
//     res.render('gallery/mygallery.html');
//   });




app.use(flash());

app.listen(3000, function(){
  console.log('Server up!')
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
