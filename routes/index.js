var express = require('express');
var router = express.Router();
var Auth = require('../models/auth.js');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/login',checkNotLogin);
router.get('/login', function(req, res){
    res.render('login', { title: '用户登陆'});
});

router.post('/login',notAuthentication);
router.post('/login',doLogin);

router.get('/home',authentication);
router.get('/home', function(req, res){
    res.render('home', { title: '用户登陆'});
});
//router.get('/mypage',authentication);
//router.get('/home',function(req, res){
 //       authentication();

 // });

/*
router.doLogin = function(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username===user.username && req.body.password===user.password){
        req.session.user=user;
        res.redirect('/home');
    }
    else {
        req.session.error = '用户名或密码不正确';
        res.redirect('/login');
    }
}; */

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.session.error =  '已登入';
        return res.redirect('/');
    }
    next();
}

function authentication(req, res, next) {

     if (!req.session.user) {
         req.session.error = '请先登陆';
         return res.redirect('/login');
     }
    next();
}
function notAuthentication (req, res, next) {
    if (req.session.user) {
        req.session.error='已登陆';
        return res.redirect('/');
    }
    next();
}
function doLogin(req, res){
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username===user.username && req.body.password===user.password){
        req.session.user=user;
       // res.render('mypage', { title: '我的页面'});
      //  if(err) console.log(err);
        //res.redirect('/mypage');
       // res.render('home', { title: '我的页面'});
        res.redirect('/home');
    //return res.redirect('/login');
       // res.redirect('/home');
      //  if(err) console.log(err);
        //res.redirect('/home',{ title: '用户登陆'});

    }
    else {
        req.session.error = '用户名或密码不正确';
        res.redirect('/login');
       //res.redirect('/login',{title: '用户登陆'});
    }
}

function logout(req, res) {
    req.session.user=null;
    res.redirect('/');
}
module.exports = router;
