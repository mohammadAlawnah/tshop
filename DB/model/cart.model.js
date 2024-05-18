import mongoose, { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
    userId : {
        type:Types.ObjectId,
        ref : 'User',
        required : true,
    },
    products : [{
        productId :{type:Types.ObjectId,ref:'Product',required : true},
        quantity:{type:Number,default:1},
    }],

});

    

const CartModel = model('Cart',cartSchema);

export default CartModel;