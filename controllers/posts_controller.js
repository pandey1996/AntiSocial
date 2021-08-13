const db=require('../config/mongoose');
const DBcon_post=require('../models/post');
const DBcon_comment=require('../models/comments');
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

module.exports.destroyPosts=function(req,res){
    DBcon_post.findById(req.params.id,function(err,post){
        if(err){ console.log("Error in connecting to DB in posts",err); return res.redirect('back');}
        if(post.user==req.user.id){
            post.remove();
            DBcon_comment.deleteMany({
                post: req.params.id
            },function(err){
                if(err){ console.log("Error in connecting to DB in posts",err); return res.redirect('back');}
            });
        }
        return res.redirect('/');
    });
}