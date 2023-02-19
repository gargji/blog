var jwt = require('jsonwebtoken');
const UserModel= require('../models/User')


const apimiddleware = async(req,res,next)=>{
    console.log(req.body)
<<<<<<< HEAD
    // res.send(req.body)
=======

>>>>>>> 5f28a3eaf8392a9195ab53dc3e564fe219f19f00
console.log(req.body.token)

const token =req.body.token;
console.log(token)
if(!token){
    res.send({ status: "failed", message: "😓" });

}else{
    const verify_token =jwt.verify(token,'vishal12345')
//    console.log(verify_token)
const data=await UserModel.findOne({_id:verify_token.userId})
console.log(data)
<<<<<<< HEAD
res.status(200).json({
    success: true,
    data:data
})
=======
res.send({ status: "success",data:data });
>>>>>>> 5f28a3eaf8392a9195ab53dc3e564fe219f19f00

}
// console.log(token)
}
module.exports=apimiddleware
