import mongoose, { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    userId : {
        type:Types.ObjectId,
        ref : 'User',
        required : true,
    },
    products : [{
        productName:{
            type : String,
        },
        productId :{type:Types.ObjectId,ref:'Product',required : true},
        quantity:{type:Number,default:1},
        unitPrice:{
            type:Number,
            required:true,
        },
        finalPrice : {
            type:Number,
            required:true,
        }
    }],
   

    finalPrice:{
        type : Number,
        required : true,
    },
    address:{
        type : String,
        required:true,
    },
    phoneNumber:{
        type : String,
        required:true,
    },
    paymentType:{
        type:String,
        enum:['cash','cart'],//visa cart
        default:'cash'
    },
    coponId:{
        type:Types.ObjectId,
        ref:'Coupon'
    },
    status:{
        type:String,
        default:'panding',
        enum : ['panding','cancelled','confirmed','onway','delivered'],
    },
    notes:{
        type:String,
    },
    rejectedReason:{
        type:String//اذا رفض الطلب ليش رفضه 
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }

},
{
    timestamps:true,

}
);

    

const OrderModel = model('Order',orderSchema);

export default OrderModel;