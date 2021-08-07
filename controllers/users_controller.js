const db=require('../config/mongoose');
const DBcon=require('../models/user');

module.exports.profile=function(req,res){
    return res.end('<h1> User Profile </h1>');
}
module.exports.posts=function(req,res){
    return res.end('<h1>Ghantaa ka History</h1>');
}

module.exports.signup=function(req,res){
    return res.render('signUp',{
        title: "Sign Up"
    });
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
    return res.render('signIn',{
        title: "Sign In"
    });
}
module.exports.signedin=function(req,res){
   /* if(req.body.username==null || req.body.password==null)
        return res.redirect('back');
    DBcon.find({
        username: req.body.username
    },
    function(err,doc){
        if(err){
            console.log('User Not Found or Password not matched');
        }
        console.log(doc);
        return res.render('home',{
            title: doc.name
        });
    });*/
    return res.redirect('/users/profile');
}