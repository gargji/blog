const express =require('express')

const BlogController = require('../controllers/api/BlogController')
const UsersController = require('../controllers/api/UsersController')
const CheckUserAuthapi = require('../middleware/apimiddleware')
const router =express.Router()




router.get('/blogs',BlogController.Blogs)
router.get('/blogview/:id',BlogController.Blogview)



// userscontroller

router.post('/register',UsersController.Resgister)
router.post('/verify_login',UsersController.verify_login)
router.post('/profile',CheckUserAuthapi)

router.get('/logout',UsersController.logout)


// admin



router.get('/contact',UsersController.contact)
router.get('/showusers',UsersController.showusers)
router.post("/contactinsert",UsersController.contactinsert)
router.post('/bloginsert',BlogController.insertblog)
router.post('/blogupdate/:id',BlogController.Blogupdate)
router.get("/blog_delete/:id",BlogController.blogdelete)
module.exports=router