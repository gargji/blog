const express = require('express')

const app = express()
const port = 3000
// const port =process.env.PORT||3000
const session =require('express-session')
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
app.use(fileUpload({useTempFiles: true}));
// 
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const web =require("./routes/web")
const cloudinary = require('cloudinary');

const api=require('./routes/api')
// const bcrypt = require('bcrypt');

// DOTENV KE LIYE
const dotenv=require('dotenv')
dotenv.config({path:'.env'})


// const AdminController = require('./controllers/Admin/AdminController')
// const FrontendController = require('./controllers/FrontendController')
//  messege ke liye
app.use(session({
  secret:"secret",
  cookie:{ maxAge:60000},
  resave:false,
  saveUninitialized:false,
}));
app.use(flash())
// data ke liye
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//  connect to db
const connectDB=require('./db/connectdb')
// const CategoryController = require('./controllers/Admin/CategoryControoller')
// const { blogview } = require('./controllers/Admin/AdminController')
connectDB()
// ejs set krne ke liye
app.set('view engine','ejs')




app.use(express.static('public'))

// routes ke liye
app.use("/",web)
// localhost:3000


// api
app.use('/api',api)
// localhost:3000/api

// app.get("/",FrontendController.home)
// app.get("/about",FrontendController.about)
// app.get("/bloglist",FrontendController.bloglist)
// app.get("/contact",FrontendController.contact)
// app.get("/blogdetail",FrontendController.blogdetail)
// app.get("/login",FrontendController.login)


// // admin controller
// app.get('/Admin/dashboard',AdminController.dashboard)


// // ADMIN DASHBOARD
// app.get('/Admin/blogs',AdminController.blogs)
// app.get('/Admin/addblogs',AdminController.Addblogs)

// // insert ke liye
// app.post('/admin/insert_blog',AdminController.insertblog)

// // view ke liye
// app.get("/admin/blog_view/:id",AdminController.blogview)


// // edit
// app.get("/admin/blog_edit/:id",AdminController.blogedit)
// app.post('/admin/blog_update/:id',AdminController.blogupdate)

// // delete
// app.get("/admin/blog_delete/:id",AdminController.blogdelete)

// // admin category controller
// app.get("/admin/category",CategoryController.CategoryDisplay)
// app.get("/admin/createcategory",CategoryController.CreateCategory)
// app.post("/admin/categoryinsert",CategoryController.CategoryInsert)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`)
// })

// npm install jsonwebtoken