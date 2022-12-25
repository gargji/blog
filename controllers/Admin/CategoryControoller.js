const CategoryModel=require('../../models/Category')

class CategoryController {

    static CategoryDisplay =async(req,res)=>{
        const data=await CategoryModel.find()
        // console.log(data)
        res.render('Admin/Category/CategoryDisplay',{d:data})
    }
    static CreateCategory= async(req,res)=>{
        res.render('Admin/Category/CreateCategory')
    }
    static CategoryInsert= async(req,res)=>{
        console.log(req.body);
        try{
            const result=new CategoryModel({
                title:req.body.Title,
                name:req.body.Name,
                email:req.body.email,
                description:req.body.Description

            })
            await result.save()
            res.redirect('/admin/category')

        }catch(err){
            console.log(err)
        }
    }
}
module.exports = CategoryController