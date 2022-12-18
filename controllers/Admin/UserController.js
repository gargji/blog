const UserModel = require('../../models/User')
// const UsaerModel =require('../../models/User')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


class UserController {



    static AdminResgister = async(req,res)=>{
        res.render('admin/register',{message : req.flash('error')})
    }

    static Resgister = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        // input wale name hai ye jo form me hai inhe variable me store krlia
        const{name,email,password,confirmpassword} = req.body; 
        const admin = await UserModel.findOne({email:email})
        if(admin){
           req.flash('error','Email Alreadt Exists!')
            return res.redirect('/admin/register')
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
                        req.flash('success','Registration successfully ! please login')
                        return res.redirect('/login')
                        
                    }catch(err){
                        console.log(err)
                    }

                }else{
                req.flash('error','Password and Confirm Password does not Match!')
                return res.redirect('/admin/register')
                }

            }
            else{
                req.flash('error','All Feilds Are Require')
                return res.redirect('/admin/register')
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
                    res.redirect('/admin/dashboard')
                }else{
                    req.flash('error','email or  passowrd is not valid')
                   return res.redirect('/login')
                   }
               }
               else{req.flash('error','email or  passowrd is not valid')
               return res.redirect('/login')


               }
            }else{
                req.flash('error','All Feilds Are Require')
                return res.redirect('/login')

            }
        }catch(err){
            console.log(err)
        }
        // res.render('admin/register',{message : req.flash('error')})
    }

    static logout =async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')

        }catch(err){
            console.log(err)
        }
    }



}
module.exports=UserController