var jwt = require('jsonwebtoken');
const UserModel= require('../models/User')


const CheckUserAuth = async(req,res,next)=>{
//   console.log("not auth user")

const {token} =req.cookies;
if(!token){
    req.flash('error','unauthrized user plzz login')
            return res.redirect('/login')

}else{
    const verify_token =jwt.verify(token,'vishal12345')
//    console.log(verify_token)
const data=await UserModel.findOne({_id:verify_token.userId})
console.log(data)
req.data1=data
    next()
}
console.log(token)
}
module.exports=CheckUserAuth