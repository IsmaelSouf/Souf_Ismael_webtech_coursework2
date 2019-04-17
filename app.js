const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

//Init app
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Allows to read the body inputs
app.use(express.urlencoded({extended:true}));

var isAuthenticated = function(req, res, next) {
  user = req.cookies['username'];
  if (user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/index', function(req, res) {
  res.render('index');
});

app.get('/base64', function(req, res) {
  res.render('base64');
});

app.get('/morse', function(req, res) {
  res.render('morse');
});

app.get('/vigenere', function(req, res) {
  res.render('vigenere');
});

app.get('/register', function(req, res){
  res.render('register');
});

app.get('/login', function(req, res){
  user = req.cookies['username'];
  if (user) {
    res.redirect('/inbox');
  } else {
    res.render('login');
  }
});

app.get('/logout', function(req, res) {
  user = req.cookies['username'];
  res.clearCookie('username');
  res.redirect('/login');
});

app.get('/messenger', isAuthenticated, function(req, res) {
  var userarray = [];
  fs.readFile('register.json', function(err, data) {
    var userdetails = JSON.parse(data);
    for (var i = 0; i < userdetails.length; i++) {
      var eachuser = userdetails[i].username;
      userarray.push(eachuser);
    }
    res.render('messenger', {data: userarray.sort()});
  })
});

app.get('/profile', isAuthenticated, function(req, res) {
  if (user == 'admin'){
    res.render('admin');
  } else {
    fs.readFile('register.json', function(err, data) {
      var userdetails = JSON.parse(data);
      for (var i=0; i<userdetails.length; i++){
        if (userdetails[i].username == user) {
          var name = userdetails[i].name;
          var email = userdetails[i].email;
          var username = userdetails[i].username;
        }
      }
      res.render('profile', {name:name, email:email, username:username});
    })
  }
});

app.get('/inbox', isAuthenticated, function(req, res) {
  var msgarray = [];
  fs.readFile('messages.json', function(err, data) {
    msglist = JSON.parse(data);
    for (var i = 0; i < msglist.length; i++) {
      if (msglist[i].receiver == user){
        var eachsender = msglist[i].sender;
        var eachmsg = msglist[i].message;
        var obj = 'Username: ' + eachsender + ' Message: ' + eachmsg;
        msgarray.push(obj);
      }
    }
    res.render('inbox', {data:msgarray});
  })
});

//Post Requests to READ
app.post('/register', function(req, res){
  //username = get.
  var userlist = [];
  fs.readFile('register.json', function(err, data) {
    if (data == 0) {
      var name = req.body.name;
      var email = req.body.email;
      var username = req.body.username;
      var hash = req.body.password;
      const salt = 10;
      var password = bcrypt.hashSync(hash, salt, function(err, hash) {
        if (err) throw err;
      })
      userlist = [{name:name,email:email,username:username,password:password}];
      userlist.push(obj);
      fs.writeFileSync('register.json', JSON.stringify(userlist, null, 2), finished);
      function finished(err) {
        console.log('Successfully added');
      }
    } else {
      userlist = JSON.parse(data);
      var name = req.body.name;
      var email = req.body.email;
      var username = req.body.username;
      var hash = req.body.password;
      const salt = 10;
      var password = bcrypt.hashSync(hash, salt, function(err, hash) {
        if (err) throw err;
      })
      var obj = {name:name,email:email,username:username,password:password};
      userlist.push(obj);
      fs.writeFile('register.json', JSON.stringify(userlist, null, 2), finished);
      function finished(err) {
        console.log('Successfully added');
      }
    }
    res.redirect('/register');
  });
});

//User login and creates cookies
app.post('/login', function(req, res) {

  fs.readFile('register.json', function(err, data) {
    var user = JSON.parse(data);
    var luname = req.body.luname;
    var lpword = req.body.lpword;
    var auth = false;
    for (var i = 0; i < user.length; i++) {

      if (user[i].username == luname) {
        var match = bcrypt.compareSync(lpword, user[i].password);
        if (match) {
          res.cookie('username', luname, {expire: 360000 + Date.now()});
          auth = true;
        }
      }
    }
    if (auth == true) {
      res.redirect('/inbox');
    } else {
      res.redirect('/login');
    }
  });
});

//Creates json object with users message
app.post('/messenger', function(req, res) {
  var msglist = [];
  fs.readFile('messages.json', function(err, data) {
    if (data == 0) {
      var sender = req.cookies['username'];
      var receiver = req.body.receiver;
      var message = req.body.msg;

      msglist = [{sender:sender,receiver:receiver,message:message}];
      fs.writeFile('messages.json', JSON.stringify(msglist, null, 2), finished);
      function finished(err) {
        console.log('Successfully added');
      }
    } else {
      msglist = JSON.parse(data);
      var sender = req.cookies['username'];
      var receiver = req.body.receiver;
      var message = req.body.msg;

      var obj = {sender:sender,receiver:receiver,message:message};
      msglist.push(obj);
      fs.writeFile('messages.json', JSON.stringify(msglist, null, 2), finished);
      function finished(err) {
        console.log('Successfully added');
      }
    }
  })
  res.redirect('/messenger');
});

//POST request to UPDATE
app.post('/profile', function(req, res) {
  var user = req.cookies['username'];
  fs.readFile('register.json', function(err, data) {
    var userdetails = JSON.parse(data);
    var name = req.body.name;
    var email = req.body.email;
    var hash = req.body.password;
    const salt = 10;
    var password = bcrypt.hashSync(hash, salt, function(err, hash) {
      if (err) throw err;
    })
    for (var i=0; i<userdetails.length; i++){
      if (userdetails[i].username == user) {
        userdetails[i].name = name;
        userdetails[i].email = email;
        userdetails[i].password = password;
        fs.writeFile('register.json', JSON.stringify(userdetails, null, 2), finished);
        function finished(err) {
          console.log('Successfully added');
        }
      }
    }
    console.log('Successfully Updates');
    res.redirect('/profile');
  })
});

//Start Server
var server = app.listen(5000, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Listening on http://%s:%s", host, port)
})
