var jwt = require('jsonwebtoken');
const UserModel= require('../models/User')


const apimiddleware = async(req,res,next)=>{
    console.log(req.body)
    res.send(req.body)
console.log(req.body.token)

const token =req.body.token;
console.log(token)
if(!token){
    res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });

}else{
    const verify_token =jwt.verify(token,'vishal12345')
//    console.log(verify_token)
const data=await UserModel.findOne({_id:verify_token.userId})
console.log(data)
res.status(200).json({
    success: true,
    data
})

}
// console.log(token)
}
module.exports=apimiddleware
