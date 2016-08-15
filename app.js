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
var db = pgp('postgres://johnchristie@localhost:5432/test2');

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
     res.render('gallery/gallery.html', {'email': req.session.user.email, data });
    });
  };
});

app.get("/gallery/all", function(req, res){
  db.any('SELECT * FROM gallery').then(function(data){
    var gallery_data = {
      "gallery": data
    };
    res.render('gallery/all.html', gallery_data);
  });
});

app.get('/mygallery/:id', function(req, res){
  var id = req.params.id;
  console.log(id)
 res.render('gallery/mygallery.html', {'id':id});
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

// app.get('/api/:picid',function(req,res){
//   var picid = req.params.picid;
//   request(rijksSel+picid+rijksEction, function (error, response, body){
//     if (!error && response.statusCode ===200) {
//       var selectData = JSON.parse(body);
//       console.log(selectData)
//       console.log(rijksSel+picid+rijksEction)
//        res.sendrender(selectData)

//     }

// })
// })

app.get('/mygallery/selection/:id/:picid',function(req,res){
  var id = req.params.id;
  var picid = req.params.picid;

  console.log("*****"+picid)
  request(rijksSel+picid+rijksEction, function (error, response, body){
    if (!error && response.statusCode ===200) {
      var selectData = JSON.parse(body);
      console.log(selectData)
      console.log(rijksSel+picid+rijksEction)
       res.render('gallery/selection.html', {selectData, id, picid})

    }

})
})

// app.put('/users/:id',function(req,res){
//   user = req.body
//   db.none("UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4",
//     [user.name,user.email,user.password,user.id]).then(function(data){
//       console.log('update done!')
//       res.json(user)
//     })
// })



// app.get('/create',function(req,res){
//   res.render('create')
// })


app.post('/ngall', function(req, res){
  console.log(req.body)
  npic = req.body
  npic.user_id = Number(npic.user_id);
  console.log(npic);
  db.none('INSERT INTO gallery (user_id) VALUES ($1)', [npic.user_id]).then(function(){
      res.send('OK')
    });
});






//NOT FINISHED
// app.delete('/users/:id',function(req,res){
//   picid = req.params.id
//   db.none("DELETE * FROM gallery WHERE id=$1",[picid]).then(function(data){
//       console.log('delete done!!!!!')
//       res.render('index')
//     })
// })






app.use(flash());

app.listen(3000, function(){
  console.log('Server up!')
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

const router = require('./router')(app);
