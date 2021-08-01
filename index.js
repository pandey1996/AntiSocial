const express=require('express');
const app=express();
const port=8000;

app.listen(port, function(err){
    if(err){
        console.log('Error while Listening');
        console.log(`Error : ${err}`);
    }
    console.log(`Node Server is running on Port ${port}`);
});