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
    });
  };
});

app.get('/mygallery/:id', function(req, res){
  var id = req.params.id;
 res.render('gallery/mygallery.html');
    });






var key = process.env.API_KEY;
var nightW = 'sk-c-5'
var paris ='RP-P-2013-39-2-2-18'
var red = 'f.normalized32Colors.hex=&#x23ff0000'


// var rijks = "https://www.rijksmuseum.nl/api/en/collection/?key="+key+"&format=json&ps=80&"+red

var rijks = "https://www.rijksmuseum.nl/api/en/collection/?key="+key+"&format=json&ps=80&f.normalized32Colors.hex=%20%23"

app.get('/api/:id',function(req,res){
  var id = req.params.id;
  console.log(rijks+id)
  request(rijks+id, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var rijksData = JSON.parse(body)
      // console.log(pic.artObject.webImage.url)
      res.send(rijksData);
  //     id = req.params.id
  // id = parseInt(id)-1
  // console.log("Pokemon "+(id+1)+" is: "+pokemon[id])
  // res.send(pokemon[id])
};
})
})


app.use(flash());

app.listen(3000, function(){
  console.log('Server up!')
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
