const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const https = require('https');

require('dotenv').config();
var request = require('request');
var key = process.env.API_KEY;

var pgp = require('pg-promise')();
// const db = pgp('postgres://johnchristie@localhost:5432/test2');
const db = pgp(process.env.DATABASE_URL)

var rijks = "https://www.rijksmuseum.nl/api/en/collection/?key="+key+"&format=json&ps=80&f.normalized32Colors.hex=%20%23"

var rijksSel = "https://www.rijksmuseum.nl/api/en/collection/"
var rijksEction = "?key="+key+"&format=json"



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





app.get('/gallery', function (req, res){
  if(!req.session.user){
    res.redirect('sessions/new');
  } else {
    var userNow = req.session.user;
    db.one('SELECT * FROM users WHERE email = $1', [userNow.email]).then(function(data){
     res.render('gallery/welcome.html', {'email': req.session.user.email, data });
    });
  };
});

app.get("/gallery/all/:id", function(req, res){
  var id = req.params.id;
  db.any('SELECT * FROM gallery').then(function(data){
    var gallery_data = {
      "gallery": data
    };
    res.render('gallery/all.html', {gallery_data, id});
  });
});

app.get('/browse/:id', function(req, res){
  var id = req.params.id;
  console.log(id)
 res.render('gallery/browse.html', {'id':id});
    });

app.get("/user/:id", function(req, res){
  var id = req.params.id;
  db.any('SELECT * FROM gallery WHERE user_id=$1', [id]).then(function(data){
    var gallery_data = {
      "gallery": data
    };
    res.render('gallery/user.html', {gallery_data, id});
  });
});



app.get('/api/:color',function(req,res){
  var color = req.params.color;
  request(rijks+color, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var rijksData = JSON.parse(body)
      res.send(rijksData);
};
})
})


app.get('/browse/selection/:id/:picid',function(req,res){
  var id = req.params.id;
  var picid = req.params.picid;

  console.log("*****"+picid)
  request(rijksSel+picid+rijksEction, function (error, response, body){
    if (!error && response.statusCode ===200) {
      var selectData = JSON.parse(body);

       res.render('gallery/selection.html', {selectData, id, picid})

    }

})
})



app.post('/ngall/:id', function(req, res){
  var id = req.params.id
  console.log(req.body)
  npic = req.body
  npic.user_id = Number(npic.user_id);
  console.log(npic);
  db.none('INSERT INTO gallery (user_id, picid, picurl, hex1, hex2, hex3, hex4, hex5, hex6, hex7, hex8) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [npic.user_id,npic.picid,npic.picurl,npic.hex1,npic.hex2,npic.hex3,npic.hex4,npic.hex5,npic.hex6,npic.hex7,npic.hex8]).then(function(id){
      res.send('/user/'+id);
    });
    });


app.delete('/delete/:id',function(req,res){
  picid = req.params.id
  console.log(picid)
  db.none("DELETE FROM gallery WHERE picid=$1", [picid]).then(function(data){
      console.log('delete done!!!!!')

    })
  res.send('/gallery/all')
})






app.use(flash());

// app.listen(3000, function(){
//   console.log('Server up!')
// });
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
