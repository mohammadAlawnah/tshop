import CartModel from "../../../DB/model/cart.model.js"
import couponModel from "../../../DB/model/coupon.model.js"
import OrderModel from "../../../DB/model/order.model.js";
import productModel from "../../../DB/model/product.model.js";
import userModel from "../../../DB/model/user.model.js";

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PZGvqRtHZP1Vzg7qbWAaWvE9tQnbDmpuo48S0blwUnhVhYkbAXX3fDAKS7ZWyF7hXZ9QglGfrBBd9i0qRTb0T9L00KPnYLjWz');


export const create = async(req,res)=>{

    const {couponName} = req.body
    const cart = await CartModel.findOne({userId:req.user._id});

    if(!cart){
        return res.json({message : 'cart is empty'});
    }
    req.body.products = cart.products;


    if(couponName){
        const coipon = await couponModel.findOne({name : couponName});

        if(!coipon){
            return res.json({message:'coupon not found'});
        }

        if(coipon.expireDate < new Date()){
            return res.json({message : 'coupon expired'});
        }

        if(coipon.usedBy.includes(req.user._id)){
            return res.json({message : 'coupon alredy used'})
        }

        req.body.coupon = coipon;
    }



    let finallProductList = [];
    let subTotal = 0;

    for(let product of req.body.products){

     const checkProduct = await productModel.findOne({
        _id : product.productId,
        stock :{$gte:product.quantity} // gte : greter then or equale
     })

     if(!checkProduct){
        return res.status(400).json({message : 'product quantity not available'})
     }

     product = product.toObject();// هيك بنحولها من بيسون ل جيسون 

     product.name = checkProduct.name;
     product.stock = checkProduct.stock;
     product.unitPrice = checkProduct.price;
     product.finalPrice = product.quantity * checkProduct.finalPrice;
     subTotal +=product.finalPrice

     finallProductList.push(product);
    
    }

    const user = await userModel.findById(req.user._id);

    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.address = user.phone;
    }

    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:'USD',
                unit_amount: subTotal - (subTotal * ((req.body.coupon?.amount ||0))/100),
                product_data : {
                    name : user.userName
                }
            },
            quantity : 1
        }],
        mode:'payment',
        success_url : `http://www.facebook.com`,
        cancel_url : `http://www.yotube.com`

    })

    // return res.json(session);


    const order = await OrderModel.create({
        userId : req.user._id,
        products : finallProductList,
        finalPrice : subTotal -(subTotal * (req.body.coupon.amount || 0)/100),
        address : req.body.address,
        phoneNumber : req.body.phone,
        updatedBy : req.user._id,
    });

    if(order){
        for (const product of req.body.products){
            await productModel.findOneAndUpdate({_id:product.productId},
                {
                    $inc:{
                        stock:-product.quantity
                    }
                }
            )
        }

        if(req.body.coupon){
            await couponModel.findByIdAndUpdate({_id:req.body.coupon._id},{
                $addToSet:{
                    updatedBy : req.user._id
                }
            })
        }


        await CartModel.updateOne({userId:req.user._id},{
            products :[]
        })
    }

    return res.json({message : 'success',order})

   


    // for(let product of req.body.products){
    //     let checkProduct = await productModel.findOne({
    //         _id : product.productId,
    //         stock:{$gte:product.quantity}
    //     });
    //     if(!checkProduct){
    //         return res.status(400).json({message : 'Product quantity not available'})
    //     }
    //     console.log(product.name)
    //     product.name = checkProduct.name;
    //     product.discount = checkProduct.discount;
    //     product.finalPrice = checkProduct.finalPrice;
    //     product.price = checkProduct.price;
    //     console.log(product.name)

    //     return res.json(product)


    // }

}

export const getOrder = async(req,res)=>{
    const orders = await OrderModel.find({$or:[
        {
            status:'panding',
        },
        {
            status:'confirmed'
        }
    ]});
    return res.json({message : 'succsess',orders})


}

export const getUserOrders = async(req,res)=>{

    const orders= await OrderModel.find({userId:req.user._id});

    return res.json({message : 'success',orders})

}

export const changeStatus = async(req,res)=>{
    const {orderId} = req.params;
    const{status} = req.body
    const order = await  OrderModel.findOne({_id:orderId})

    if(!order){
        return res.json({message : "order not found"});

    }
    order.status = status;
    await order.save();






    return res.json({message : "success",order})
}