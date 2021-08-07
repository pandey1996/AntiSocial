const express=require('express');
const passport=require('passport');
const router=express.Router();

const users_controller=require('../controllers/users_controller');

router.get('/profile',users_controller.profile);
router.get('/posts',users_controller.posts);
router.get('/signup',users_controller.signup);
router.post('/newUser',users_controller.newUser);
router.get('/signin', users_controller.signin);


// use passport as a middleware
router.post('/signedin',passport.authenticate(
        'local',
        { failureRedirect: '/users/posts' })
    ,users_controller.signedin);

module.exports=router;