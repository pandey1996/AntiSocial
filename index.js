const express=require('express');
const app=express();
const port=8000;
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract layouts and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'AntiSocial',
    // TODO change a secret before deployment
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express Router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error while Listening');
        console.log(`Error : ${err}`);
    }
    console.log(`Node Server is running on Port ${port}`);
});