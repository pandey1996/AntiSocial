const express=require('express');
const router=express.Router();

const users_controller=require('../controllers/users_controller');

router.get('/profile',users_controller.profile);
router.get('/posts',users_controller.posts);
router.get('/signup',users_controller.signup);
router.post('/newUser',users_controller.newUser);
router.get('/signin', users_controller.signin);
router.post('/signedin',users_controller.signedin);

module.exports=router;