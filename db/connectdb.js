const mongoose =require('mongoose')
url="mongodb+srv://rahul:6267467976@cluster0.enybaiw.mongodb.net/blog?retryWrites=true&w=majority"
const connectDB=()=>{
    // return mongoose.connect('mongodb://localhost:27017/blog_project')
    return mongoose.connect(url)
    .then(()=>{
        console.log('connected successfully')
    }).catch((err)=>{
        console.log('error')
    })
}
module.exports=connectDB