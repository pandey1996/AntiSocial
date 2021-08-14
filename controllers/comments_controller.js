const db=require('../config/mongoose');
const comments_db=require('../models/comments');
const post_db=require('../models/post');
console.log('comment-controller called!!!!!');
module.exports.addComments=function(req,res){
    
    post_db.findById(req.body.post_id,function(err,post){
        if(err){ console.log("Error in connecting to DB during comments",err); return res.redirect('back');}
        //console.log(post);
        if(post){
            comments_db.create({
                content: req.body.newComment,
                user: req.user._id,
                post: req.body.post_id
            },function(err,comment){
                if(err){ console.log("Error in connecting to DB during comments",err); return res.redirect('back');}
                console.log(comment);
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
        else{

            res.redirect('/');
        }
    });
    
}


module.exports.destroyComments=function(req,res){
    comments_db.findById(req.params.id,function(err,comment){
        if(err){ console.log("Error in connecting to DB during comments",err); return res.redirect('back');}
        if(comment.user==req.user.id){
            post_db.findById(comment.post,function(err,post){
                if(err){ console.log("Error in connecting to DB during comments",err); return res.redirect('back');}
                post.comments.pull(comment);
                post.save();
            });
            comment.remove();
        }
    });
    return res.redirect('/');
}