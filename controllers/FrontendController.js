const BlogModel=require('../models/Blog')
const AboutModel=require('../models/about')
const CategoryModel=require('../models/Category')

class FrontendController {

    static home = async(req,res)=>{
        try{
            const blog_data= await BlogModel.find().sort({_id:-1}).limit(8)
            // console.log(blog_data)
            res.render("front/home",{d:blog_data,})
        }catch(err){
            console.log(err)
        }
       
    }
    static about = async(req,res)=>{
        const aboutdata = await AboutModel.find().sort({_id:-1})
        res.render("front/about",{A:aboutdata})
    }
    static contact = async(req,res)=>{
        res.render("front/contact")
    }
    static blogdetail = async(req,res)=>{
        try{// console.log(req.params.id)
            const category = await CategoryModel.find()
            // console.log(category)
        const detail = await BlogModel.findById(req.params.id)
        // recent blogs ke liye
        const recentblog =await BlogModel.find().sort({_id:-1}).limit(4)

        // ye recent blog showke liye short
        // console.log(detail)
        res.render("front/blogdetails",{d:detail,c:category,r:recentblog})}
        catch(err){
            console.log(err)
        }
    }
    static bloglist = async(req,res)=>{
        const blog_data= await BlogModel.find().sort({_id:-1})
        res.render("front/bloglist",{b:blog_data})
    }
    static login = async(req,res)=>{
        res.render("front/login",({message : req.flash('success'),error : req.flash('error')}))
    }

    // npm install bcrypt for password

}module.exports = FrontendController