var Movie = require('./../models/Movie.js');
var express = require('express');
var router = express.Router();
router.get('/movie/add' , function(req, res) {
        return res.render('movie',{
            title:'新增加|电影|管理|moive.me',
            label:'新增加电影',
            movie:false,
            content:""
        });
});
router.post('/movie/add' , function(req, res) {
    console.log(req.body.content);
    var json = req.body.content;
    if(json._id){//update
    } else {//insert
        Movie.save(json, function(err){
            if(err) {
                res.send({'success':false,'err':err});
            } else {
                res.send({'success':true});
            }
        });
    }
});
router.get('/movie/:name' , function(req, res) {
    if(req.params.name) {//
       //var obj = movieJSON(req, res);
        //res.send(obj);
        Movie.findByName(req.params.name,function(err, obj){

            return res.render('movie', {
                title:req.params.name+'|电影|管理|moive.me',
                label:'编辑电影:'+req.params.name,
                movie:req.params.name,
                content:obj
             });
        });
    }
});
function movieJSON(req, res) {
    Movie.findByName(req.params.name,function(err, obj){
        //res.send(obj);
        return obj;
    });
}
module.exports = router;