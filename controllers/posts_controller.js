const db=require('../config/mongoose');
const DBcon_post=require('../models/post');

module.exports.createPosts=function(req,res){
    DBcon_post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,prob){
        if(err){ console.log("Error in connecting to DB in posts",err); return res.redirect('back');}
        console.log(prob);
        return res.redirect('back');
    });
}