const mongoose= require('mongoose')

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        Required:true

    },
    description:{
        type:String,
        Required:true
    },
    image: {

        // update ke liye or delete ke liye image me public id
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
}
,{timestamps:true})
// time stamp time show ke liye
const BlogModel = mongoose.model('blog',BlogSchema)
module.exports=BlogModel