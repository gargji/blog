const TeacherModel = require('../../models/Teacher')
const BlogModel = require('../../models/Blog')
const Aboutmodel = require('../../models/about')
const ContactModel =require('../../models/contact')
  //for image npm i express-fileupload
//    for cloudinary npm install cloudinary
// image ke liye
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dx7idx5vo', 
    api_key: '272392663837587', 
    api_secret: 'oFarpkR4SGyWWopZ8WlJ-rceeeA',
    // secure: true
  });


// npm install body-parser  data ke liye
class AdminController {

    static dashboard = async (req, res) => {
        const{name,email}=req.data1
        res.render('Admin/dashboard',{n:name,e:email})


    }
    static blogs = async (req, res) => {
        const data = await BlogModel.find()
        // console.log(data)
        res.render('Admin/blog/blogdisplay', { d: data })
    }
    static Addblogs = async (req, res) => {
        res.render('Admin/blog/addblogs')


    }

    static about = async (req, res) => {
        res.render('Admin/about/about')


    }
    static insertabout = async (req, res) => {
            // console.log(req.body)
        
        try {
            const result = new Aboutmodel({
             
                about: req.body.about,
            
            })
            await result.save()
            res.redirect('/admin/dashboard')  // route ka url dena h



        } catch (err) {
            console.log(err)
        }
    }


    // insert method
    static insertblog = async (req, res) => {
        //     console.log(req.body)
        // console.log(req.files)
        const imagefile =req.files.blog_image
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:"blog_image",
            width:400
        })
        // console.log('data inserted')
        try {
            const result = new BlogModel({
                title: req.body.Title,
                description: req.body.Description,
                // image:req.body.blog_image
                // image:image_upload.secure_url
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
            })
            await result.save()
            res.redirect('/admin/blogs')  // route ka url dena h



        } catch (err) {
            console.log(err)
        }
    }

    static blogview = async (req, res) => {


        // console.log(req.params.id)

        const data = await BlogModel.findById(req.params.id)
        // console.log(data)
        res.render('Admin/blog/blogview', { viewdata: data })
        // res.send('hello')



    }

    static blogedit = async (req, res) => {


        // console.log(req.params.id)

        const data = await BlogModel.findById(req.params.id)
        // console.log(data)
        res.render('Admin/blog/blogedit', { editdata: data })
        // res.send('hello')

    }
    static blogupdate = async (req, res) => {

        console.log(req.body)

        //    console.log(req.par)
        // console.log(req.params.id)
       
        try {
            const user =await BlogModel.findById(req.params.id)
            const image_id=user.image.public_id;
            console.log(image_id)
            await cloudinary.uploader.destroy(image_id)
            const imagefile =req.files.blog_image
            //  console.log(imagefile)
            const image_upload =await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder:"blog_image",
            width:400
            })
           


           
            



            const data = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: req.body.Title,
                description: req.body.Description,
                image:{
                    public_id:image_upload.public_id,
                    url:image_upload.secure_url
                }
              

              

            })
            // }
            await data.save()
            res.redirect('/admin/blogs')  // route ka url dena h



        } catch (err) {
            console.log(err)
        }

    }

    // khud se try
    static blogdelete = async (req, res) => {


        // console.log(req.params.id)
        try {

            // ye image delete ke liye
            const user =await BlogModel.findById(req.params.id)
            const image_id=user.image.public_id;
            console.log(image_id)
            await cloudinary.uploader.destroy(image_id)





            const data = await BlogModel.findByIdAndDelete(req.params.id)

            res.redirect('/admin/blogs')

        } catch (err) {
            console.log(err)
        }
    }





    static insertcontact = async (req, res) => {
        // console.log(req.body)
    
    try {
        const result = new ContactModel({
         
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            
        
        })
        await result.save()
        res.redirect('/admin/dashboard')  // route ka url dena h



    } catch (err) {
        console.log(err)
    }
}

static contactview = async (req, res) => {


    // console.log(req.params.id)

    const data = await ContactModel.find()
    console.log(data)
    res.render('Admin/contact/contactadmin', { viewdata: data })
    // res.send('hello')



}

}
module.exports = AdminController