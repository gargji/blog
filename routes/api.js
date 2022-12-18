const express =require('express')
const BlogController = require('../controllers/api/BlogController')
const UsersController = require('../controllers/api/UsersController')
const router =express.Router()



router.get('/blogs',BlogController.Blogs)
router.post('/bloginsert',BlogController.insertblog)
router.get('/blogview/:id',BlogController.Blogview)
router.post('/blogupdate/:id',BlogController.Blogupdate)


// userscontroller

router.post('/register',UsersController.Resgister)
router.post('/verify_login',UsersController.verify_login)
router.get('/logout',UsersController.logout)
module.exports=router