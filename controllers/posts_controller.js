const db=require('../config/mongoose');
const DBcon_post=require('../models/post');
const DBcon_comment=require('../models/comments');

module.exports.createPosts=async function(req,res){
    try{
        let post=await DBcon_post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        console.log(post);
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post Created!"
            });
        }

        req.flash('success', 'Post Published');
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

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message: 'Post Deleted'
                });
            }

            req.flash('success','Post Deleted')
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