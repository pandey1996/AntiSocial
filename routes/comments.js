const express=require('express');
const passport=require('passport');
const router=express.Router();

const commentController=require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentController.addComments);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroyComments);

module.exports=router;