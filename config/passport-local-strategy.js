const passport = require("passport");

const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');


// Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'username',
    },
    function(email,password,done){
        // find a user
        User.findOne({
            email: email
        },
        function(err,user){
            if(err){ 
                console.log('Error in finding the user');
                return done(err);
            }
            if(!user || user.password!=password){
                console.log("Invalid Username Password");
                return done(null,false);
            }
            return done(null,user);
        });
    }
));
// Serializing the user to store data into cookies
passport.serializeUser(function(user,done){
    done(null, user.id);
});

// De-Serializing the user to store data into cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){ 
            console.log('Error in finding the user');
            return done(err);
        }
        
        return done(null,user);
    });
});

//check Authentication
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/users/signin');
    }

}

passport.setAuthenticatedUser=function(req, res, next){
    if(req.isAuthenticated()){
        /// req.user has current signed-in user and we are transferrring it to res.locals
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;