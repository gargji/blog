const UserModel = require('../../models/User')
const ContactModel =require('../../models/contact')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
 
 class UsersController {


    static Resgister = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        // input wale name hai ye jo form me hai inhe variable me store krlia
        const{name,email,password,confirmpassword} = req.body; 
        // console.log(req.body)
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


                    res.status(200
                    ).json({
                        status: "success",
                        token,
                        user,
                    })
                  
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
    
    
     static contact =async(req,res)=>{
        // console.log(req.body)
        try{ const data = await ContactModel.find()
        // console.log(data)
        res.status(200).json({
            success: true,
            data
        })
           
        }catch(err){
            console.log(err)
        }
    }

    static showusers =async(req,res)=>{
        try{ const data = await UserModel.find()
        // console.log(data)
        res.status(200).json({
            success: true,
            data
        })
           
        }catch(err){
            console.log(err)
        }
    }
     static logout =async(req,res)=>{
         try{
             res.clearCookie('token')
             res.send({ status: "success", message: "logout " });
 
         }catch(err){
             console.log(err)
         }
     }


     static contactinsert = async (req,res) => {
        // console.log(req.body)
        const{name,email,password,confirmpassword} = req.body; 
    try {
        if(name && email && phone && message){
        const result = new ContactModel({
         
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            
        
        })
        await result.save()
        res.send({ status: 201, message: "contact successfully" });
    }else{
        res.send({ status: 401, message: "all filed require" });
    }
        // res.redirect('/admin/dashboard')  // route ka url dena h


    
    } catch (err) {
        console.log(err)
    }
}
    
  }
  module.exports=UsersController
