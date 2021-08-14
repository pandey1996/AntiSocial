const db=require('../config/mongoose');
const DBcon_post=require('../models/post');
const DBcon_comment=require('../models/comments');

module.exports.createPosts=async function(req,res){
    try{
        await DBcon_post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        return res.redirect('back');
    }
    catch(err){
        console.log(Error, err);
        return;
    }
    
}

module.exports.destroyPosts=async function(req,res){

    try{
        let post=await DBcon_post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await DBcon_comment.deleteMany({ post: req.params.id });
            return res.redirect('/');
        }
        else{
            return res.redirect('/');
        }
    }
    catch(err){
        console.log("Error",err);
        return;
    }
    
}