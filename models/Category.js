const mongoose= require('mongoose')

const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        Required:true

    },
    description:{
        type:String,
        Required:true
    },
    name
    :{ type:String,
        Required:true

    },email:{
        type:String,
        Required:true

    }
})
const CategoryModel = mongoose.model('Category',CategorySchema)
module.exports=CategoryModel