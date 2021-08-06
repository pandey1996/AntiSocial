const express=require('express');
const app=express();
const port=8000;
const cookieParser=require('cookie-parser');
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');


app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extract layouts and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express Router
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if(err){
        console.log('Error while Listening');
        console.log(`Error : ${err}`);
    }
    console.log(`Node Server is running on Port ${port}`);
});