const BlogModel = require('../../models/Blog')

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dx7idx5vo',
    api_key: '272392663837587',
    api_secret: 'oFarpkR4SGyWWopZ8WlJ-rceeeA',
    // secure: true
});
class BlogController {

    static Blogs = async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({_id:-1})
            // console.log(blogs)
            res.status(200).json({
                success: true,
                blogs
            })
        } catch (err) {
            console.log(err)
        }
    }
    static insertblog = async (req, res) => {
            // console.log(req.body)
        // console.log(req.files)
        const imagefile = req.files.image
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
            folder: "blog_image",
            width: 400
        })
        // console.log('data inserted')
        try {
            const result = new BlogModel({
                title: req.body.title,
                description: req.body.description,
                // image:req.body.blog_image
                // image:image_upload.secure_url
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
            })
            await result.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "register successfull",
                    image: image_upload.secure_url
                })



        } catch (err) {
            console.log(err)
        }
    }
    static Blogview = async (req, res) => {
        try {
            const blogview = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                blogview
            })
        } catch (err) {
            console.log(err)
        }
    }

    static Blogupdate = async (req, res) => {
        // console.log(req.body)
        try {
            const data = await BlogModel.findById(req.params.id)
            const imageID = data.image.public_id;
            // console.log(imageID)
            await cloudinary.uploader.destroy(imageID)
            // delete ka 

            const imagefile = req.files.image
            const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                folder: "blog_image",
                width: 400
            })
            const update = await BlogModel.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                description: req.body.description,
                // image:req.body.blog_image
                // image:image_upload.secure_url
                image: {
                    public_id: image_upload.public_id,
                    url: image_upload.secure_url,
                },
                

            })
            await update.save()
            res
                .status(201)
                .send({
                    status: "success",
                    message: "update successfull",
                    image: image_upload.secure_url
                })
            // res.status(200).json({
            //     success: true,
            //     blogview
            // })
        } catch (err) {
            console.log(err)
        }

    }
    static blogdelete = async (req, res) => {


        // console.log(req.params.id)
        try {

            // ye image delete ke liye
            const user =await BlogModel.findById(req.params.id)
            const image_id=user.image.public_id;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id)





            const data = await BlogModel.findByIdAndDelete(req.params.id)
            res.send({ status: 201, message: "delete successfully" });
           

        } catch (err) {
            console.log(err)
        }
    }
}



module.exports = BlogController