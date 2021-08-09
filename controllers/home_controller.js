const Post=require('../models/post')
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
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('Cannot fetch Posts');
            return res.redirect('home');
        }
        //console.log(posts);
        return res.render('home',{
            title: "AntiSocial",
            posts: posts
        });
    });
}