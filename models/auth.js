/**
 * Created by Administrator on 2014/11/13.
 */

function Auth() { };

Auth.prototype.authentication = function(req, res, next){
    if (!req.session.user) {
        req.session.error='请先登陆';
        return res.redirect('/login');
    }
    next();
}

Auth.prototype.notAuthentication = function (req, res, next) {
    if (req.session.user) {
        req.session.error='已登陆';
        return res.redirect('/');
    }
    next();
}

module.exports = Auth;