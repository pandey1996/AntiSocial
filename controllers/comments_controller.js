const db=require('../config/mongoose');
const comments_db=require('../models/comments');
const post_db=require('../models/post');
console.log('comment-controller called!!!!!');
module.exports.addComments=async function(req,res){
    try{
        let post= await post_db.findById(req.body.post_id);
        if(post){
            let comment=await comments_db.create({
                content: req.body.newComment,
                user: req.user._id,
                post: req.body.post_id
            }); 
            post.comments.push(comment);
            post.save();
            res.redirect('/');            
        }
        else{

            res.redirect('/');
        }
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}


module.exports.destroyComments=async function(req,res){
    try{
        let comment=await comments_db.findById(req.params.id);
        if(comment.user==req.user.id){
            let post=await post_db.findById(comment.post);
            post.comments.pull(comment);
            post.save();
            comment.remove();
        }
        return res.redirect('/');
    }
    catch(err){
        console.log('Error',err);
        return;
    }
}