import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { customAlphabet, nanoid } from "nanoid";
// import router from "../category copy/category.router.js";
export const getAuth = (req,res)=>{
    return res.json({message : 'sucsses'})
}

export const register = async(req,res)=>{
    const {userName,email,password} = req.body;

    const user = await userModel.findOne({email})

    if(user){
        return res.status(409).json({message:"email alredy exisist"})
    }

    const hashpassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND))

    const createUser = await userModel.create({userName,email,password:hashpassword})

    return res.status(201).json({message : "success",user:createUser})

}

export const login = async(req,res)=>{
    const {email,password} = req.body;

    const user = await userModel.findOne({email})


    if(!user){
        return res.status(409).json({message : "invalid data"})
    }

    const match = await bcrypt.compare(password,user.password);

    if(user.status == "NotActive"){
        return res.status(400).json({message : "Your account is blocked"})
    }

    if(!match){
        return res.status(400).json({message:"invalid data"})
    }

    const token = jwt.sign({id:user._id, role:user.role,status:user.status},process.env.LOGINSIG);

    return res.status(200).json({message:"success",token})

}

export const sendCode = async(req,res)=>{
    const {email} = req.body;

    const code = customAlphabet('123456789@giftodiemf',5)

    const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true})

    if(!user){
        return res.status(404).json({message : "user not found"});
    }

    if(!user.confirmEmail){
        return res.status(400).json({message : "plz confairm your email"})
    }
    
    // send email code .... 

    return res.status(200).json({message:"success"});


}

export const forgotPassword = async(req,res)=>{
    const {email,password,code} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(404).json({message : "email not found"});
    }

    if(user.sendCode != code){
        return res.status(400).json({message : "invalid code"})
    }

    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode = null
    await user.save();

    return res.status(200)

}
