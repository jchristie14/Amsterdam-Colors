const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const https = require('https');





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


var key = 'XXXX';
var color = '&#x23'
var red = 'f.normalized32Colors.hex=&#x23ff0000'

https.get("https://www.rijksmuseum.nl/api/en/collection/sk-c-5?key="+key+"&format=json&ps=80&", (res) => {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);

  // res.on('data', (d) => {
  //   process.stdout.write(d);
  //   console.log('*****************'+d)
  // });

}).on('error', (e) => {
  console.error(e);
});

  // db.one('SELECT * FROM apartments WHERE id = $1', [id]).then(function(data){
    res.render('gallery/mygallery.html', data);
  // });
});



app.use(flash());

app.listen(3000, function(){
  console.log('Server up!')
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
