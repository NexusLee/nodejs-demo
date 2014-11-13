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

router.get('/login', function(req, res){
    res.render('login', { title: '用户登陆'});
});

router.post('/login',Auth.prototype.notAuthentication);

router.get('/home',Auth.prototype.authentication);


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
};
router.logout = function(req, res) {
    req.session.user=null;
    res.redirect('/');
}

/*router.authentication = function(req, res, next) {
    if (!req.session.user) {
        req.session.error='请先登陆';
        return res.redirect('/login');
    }
    next();
}
router.notAuthentication = function (req, res, next) {
    if (req.session.user) {
        req.session.error='已登陆';
        return res.redirect('/');
    }
    next();
}
*/

module.exports = router;
