const mongoose= require('mongoose')

const AboutSchema = new mongoose.Schema({
  
    about:{
        type:String,
        Required:true
    },
    
})
const AboutModel = mongoose.model('About',AboutSchema)
module.exports=AboutModel