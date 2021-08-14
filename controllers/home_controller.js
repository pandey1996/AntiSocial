const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=function(req,res){

    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log('Cannot fetch Posts');
    //         return res.redirect('home');
    //     }
    //     //console.log(posts);
    //     return res.render('home',{
    //         title: "AntiSocial",
    //         posts: posts
    //     });
    // });
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        
        if(err){
            console.log('Cannot fetch Posts');
            return res.redirect('home');
        }
        User.find({},function(err,users){
            
            if(err){
                console.log('Cannot fetch Posts');
                return res.redirect('home');
            }

            return res.render('home',{
                title: "AntiSocial",
                posts: posts,
                all_users: users
            });
        });
        //console.log(posts);
        
    });
}