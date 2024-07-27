import couponModel from "../../../DB/model/coupon.model.js"

export const create = async(req,res)=>{



    if(await couponModel.findOne({name:req.body.name})){
        return res.json({message:'coipon name alreadt exist'});
    }

    req.body.expireDate = new Date(req.body.expireDate);

    const coupon = await couponModel.create(req.body);

    return res.json({message : 'success',coupon})

}