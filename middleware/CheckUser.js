var jwt = require('jsonwebtoken');
const UserModel= require('../models/User')


const CheckUser = async(req,res,next)=>{
//   console.log("not auth user")

// console.log(req.body)
    // res.send(req.body)
// console.log(req.body.token)

const  brtoken =req.headers["token"]
// console.log(brtoken)
if(brtoken){
    const token1= brtoken.split( " ")
    // console.log(token1)
    const realtoken =token1[1]
    // console.log(realtoken)

    const verify_token =jwt.verify(realtoken,'vishal12345')
    // console.log(verify_token)
 const data=await UserModel.findOne({_id:verify_token.userId})
 // console.log(data)
 req.data1=data
//  console.log(req.data1)
 next()
}
else{
    res.send({ status: "failed", message: "token not receive😓" });

}

}
// console
// }
module.exports=CheckUser