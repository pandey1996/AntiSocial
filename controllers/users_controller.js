const db=require('../config/mongoose');
const DBcon=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('users',{
        title: "Profile"
    });
}
module.exports.posts=function(req,res){
    return res.end('<h1>Ghantaa ka History</h1>');
}

module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        return res.render('signUp',{
            title: "Sign Up"
        });
    }
}
module.exports.newUser=function(req,res){
    if(req.body.username==null || req.body.password==null || req.body.name==null){
        return res.redirect('back');
    }
    if(req.body.conpass!=req.body.password){
        console.error.bind("Passwords don't match")
        return res.redirect('back');
    }
    DBcon.findOne({email: req.body.username},function(err,user){
        if(err){ console.log('User cannot be find'); return}
        if(!user){
            DBcon.create({
                email:  req.body.username,
                password: req.body.password,
                name: req.body.name
              },
              function(err,prob){
                  if(err){
                      console.log("Error Creating User");
                      return res.redirect('back');
                  }
                  console.log(prob);
                  return res.redirect('/users/signIn');
              });
        }
        else{
            console.log('User Already Present');
            return res.redirect('back');
        }
    });
    
}
module.exports.signin=function(req,res){
    // console.log(req.cookies);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    else{
        return res.render('signIn',{
            title: "Sign In"
        });
    }
}
module.exports.createSession=function(req,res){
    return res.redirect('/users/profile');
}

module.exports.deleteSession=function(req,res){
    req.logout();
    res.redirect('/');
}
