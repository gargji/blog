const express =require('express')
const router =express.Router()


const CheckUserAuth=require("../middleware/auth")

const AdminController = require('../controllers/Admin/AdminController')
const FrontendController = require('../controllers/FrontendController')
 

const CategoryController = require('../controllers/Admin/CategoryControoller')
const { blogview } = require('../controllers/Admin/AdminController')
// const UserCOntroller = require('../controllers/Admin/UserController')
const UserController = require('../controllers/Admin/UserController')

router.get("/",FrontendController.home)
router.get("/about",FrontendController.about)
router.get("/bloglist",FrontendController.bloglist)
router.get("/contact",FrontendController.contact)
router.get("/blogdetail/:id",FrontendController.blogdetail)
router.get("/login",FrontendController.login)


// admin controller
router.get('/Admin/dashboard',CheckUserAuth,AdminController.dashboard)


// ADMIN DASHBOARD
router.get('/Admin/blogs',CheckUserAuth,AdminController.blogs)
router.get('/Admin/addblogs',AdminController.Addblogs)

// insert ke liye
router.post('/admin/insert_blog',AdminController.insertblog)

// view ke liye
router.get("/admin/blog_view/:id",AdminController.blogview)


// edit
router.get("/admin/blog_edit/:id",AdminController.blogedit)
router.post('/admin/blog_update/:id',AdminController.blogupdate)

// delete
router.get("/admin/blog_delete/:id",AdminController.blogdelete)

// admin category controller

router.get("/admin/category",CategoryController.CategoryDisplay)
router.get("/admin/createcategory",CategoryController.CreateCategory)
router.post("/admin/categoryinsert",CategoryController.CategoryInsert)


// about admin
router.get('/Admin/about',AdminController.about)
router.post('/admin/insert_about',AdminController.insertabout)


// contact

// about admin
router.get('/admin/contact',AdminController.contactview)
router.post('/admin/insert_contact',AdminController.insertcontact)

// resgister

router.get('/admin/register',UserController.AdminResgister)

router.post("/register",UserController.Resgister)



// verfy login
router.post('/verify_login',UserController.verify_login)

router.get('/logout',UserController.logout)
module.exports=router
