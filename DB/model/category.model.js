import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
    name : {
        type:String,
        unique:true,
        require : true,    
    },
    slug:{
        type : String,
        require:true,
    },
    image : {
        type:Object,
        require:true,
    },
    status : {
        type : String,
        default : 'Active',
        enum : ['Active','NotActive'],
    },
    createdBy :{
        type : Types.ObjectId,
        ref : 'User',
    },
    updateBy:{
        type:Types.ObjectId,
        ref:'User',
    }
},{
    timestamps : true,
    toJSON : {virtuals:true},
    toObject:{virtuals:true}
})

categorySchema.virtual("subcategory",{
    localField : '_id', // الي بالجدول عننا 
    foreignField : 'categoryId', // الاشي المربوط بجدول ال سب كاتيجوري 
    ref : 'Subcategory', // // اسم جدول السب كاتيجوري
})

const categoryModel = model('Category',categorySchema);

export default categoryModel;