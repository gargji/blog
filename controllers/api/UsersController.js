const UserModel = require('../../models/User')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
 
 class UsersController {


    static Resgister = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        // input wale name hai ye jo form me hai inhe variable me store krlia
        const{name,email,password,confirmpassword} = req.body; 
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
        }
        else{
            if(name && email && password && confirmpassword){
                if(password == confirmpassword){
                    try{
                        const hashpassword =await bcrypt.hash(password,10)
                        // npm install bcrypt for password encrpt
                        const result = await UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        await result.save()
                        res.send({ status: 201, message: "registration successfully" });
                        
                    }catch(err){
                        console.log(err)
                    }

                }else{
                    res.send({ status: "failed", message: "Password and Confirm Password does not Match!😓" });
                }

            }
            else{
                res.send({ status: "failed", message: "all filed are required 😓" });
            }
        }

     
    }
    static verify_login = async(req,res)=>{


        try{
            const{email,password}=req.body
            if(email && password){
            //   console.log(password)
               const user= await UserModel.findOne({email:email})
            //    console.log(user.password)
               if(user !=null){
                const ismatched =await bcrypt.compare(password,user.password)
                if((user.email) && ismatched){

                    // token genrate
                    var token = jwt.sign({ userId: user._id }, 'vishal12345');
                    // console.log(token)
                    res.cookie('token',token)
                    res.send({ status: "sucess", message: "login successfully with web token 😃🍻", "Token": token  });
                }else{
                    res.send({ status: "failed", message: "email or password not vaild  " });
                   }
                }
                else{
                 req.flash('error','you are not registerd user')
                return res.redirect('/login')
 
 
                }
             }else{
                 res.send({ status: "failed", message: "all filed required😓" });
 
             }
         }catch(err){
             console.log(err)
         }
         // res.render('admin/register',{message : req.flash('error')})
     }
 
     static logout =async(req,res)=>{
         try{
             res.clearCookie('token')
             res.send({ status: "success", message: "logout " });
 
         }catch(err){
             console.log(err)
         }
     }
  }
  module.exports=UsersController