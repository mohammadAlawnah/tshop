import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/user.model.js';

export const roles = {
    Admin : 'Admin',
    User : 'User'
}

export const auth =(accessRole = [])=>{

    // accessRole = [Admin,User]

    return async(req,res,next)=>{
        const {authorization} = req.headers;


        if(!authorization.startsWith(process.env.BERARTOKIN)){
            return res.status(400).json({message : "invalid token"})
        }

        
        const token = authorization.split(process.env.BERARTOKIN)[1];
        // return res.json(token)
        const decoded = jwt.verify(token,process.env.LOGINSIG)

        if(!decoded){
            return res.status(400).json({message : "invalid token"});
        }

        const user = await userModel.findById(decoded.id).select("userName role");

        if(!user){
            return res.status(404).json({message : "user not found"});
        }


        // user.role ==> صلاحية المستخدم الحالي 
        // accessRole array ==> الصلاحيات المطلوبة للمستخدم للوصول الى الايند بوينت 
        // بدي اشوف اذا صلاحية المستخدم الحالي موجوده ضمن الصلاحيات المطلوبه 
        // return res.json(accessRole.includes(user.role))  // treu

        if(!accessRole.includes(user.role)){
            return res.json({message : "not auth user"})
        }

        req.user = user;
        next();

    }

}