const express=require('express');
const passport=require('passport');
const router=express.Router();

const users_controller=require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication,users_controller.profile);
router.get('/posts',users_controller.posts);
router.get('/signup',users_controller.signup);
router.post('/newUser',users_controller.newUser);
router.get('/signin', users_controller.signin);


// use passport as a middleware
router.post('/createsession',passport.authenticate(
        'local',
        { failureRedirect: '/users/posts' })
    ,users_controller.createSession);



module.exports=router;