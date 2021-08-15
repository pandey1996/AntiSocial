const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res){
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users=await User.find({});
            //console.log(posts);
    
        return res.render('home',{
            title: "AntiSocial",
            posts: posts,
            all_users: users
        });    
    }
    catch(err){
        console.log(err);
        return;
    }
        
}