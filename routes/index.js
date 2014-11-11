var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/index', function(req, res) {
    res.render('index', { title: 'Express' });
});
/*
router.get('index' , function(req, res){
    res.render('index.html', { title: 'Index' });
});*/
router.get('/login', function(req, res){
    res.render('login', { title: '用户登陆'});
});
router.post('/login', doLogin);

function doLogin(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username===user.username && req.body.password===user.password){
        res.redirect('/home');
    }
    res.redirect('/login');
};

router.get('/logout', function(req, res){
    req.session.user=null;
    res.redirect('/');
});
router.get('/home', function(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    res.render('home', { title: 'Home',user: user});
});



module.exports = router;
