import userModel from "../../../DB/model/user.model.js"
export const getUsers = async(req,res)=>{

    const users = await userModel.find({});

    return res.status(200).json({message : "succsess",users})

}

export const getUserData = async(req,res)=>{

    const user = await userModel.findOne({_id:req.user._id})

    if(!user){
        return res.json({mssage : 'user not found'})
    }
    return res.json({message : 'success',user})

}