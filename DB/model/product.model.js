import mongoose, { Schema, Types, model } from "mongoose";
//8:38
const productSchema = new Schema({
    name : {
        type : String,
        unique : true,
        require:true,
        trim : true,//شيل المسافة الي قبل وشيل المسافة الي بعد
    },

    slug : {
        type : String,
        require : true,
    },

    description:{
        type : String,
        require:true,
    },

    stock : {
        type : Number,
        default : 1,
    },

    price:{
        type : Number,
        require:true,
    },
    discount:{
        type : Number,
        default :0,
    },
    finalPrice:{
        type:Number,
    },
    mainImage:{
        type : Object,
        require:true,
    },
    subImages:[{
        type : Object,
    }],

    status : {
        type : String,
        default : 'Active',
        enum :['Active','NotActive'],
    },
    sizez :{
        type : String,
        enum:['s','m','lg','xl']
    },
    colors:[String],

    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        require:true,
    },

    subcategoryId:{
        type : Types.ObjectId,
        ref : 'Subcategory',
        require : true,
    },

    createdBy : {type:Types.ObjectId,ref:'User'},
    updatedBy : {type:Types.ObjectId,ref:'User'},

},{
    timestamps : true,
})


const productModel = model('Product',productSchema)
export default productModel;
