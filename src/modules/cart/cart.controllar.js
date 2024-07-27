import CartModel from "../../../DB/model/cart.model.js";


export const get =async(req,res)=>{
    const cart = await CartModel.findOne({userId:req.user._id});
    

    return res.json({message : 'succses' , product : cart.products})
}

export const create = async(req,res)=>{

    const {productId} = req.body;

    const cart = await CartModel.findOne({userId:req.user._id});

    if(!cart){
        const newCart = await CartModel.create({
            userId : req.user._id,
            products : {productId}
        })

        return res.json({message : 'success',cart:newCart})
    }
    
    for(let i=0;i<cart.products;i++){
        if(cart.products[i].productId == productId){

            return res.json({message : "product alridy exiss"})


        }
    }

    cart.products.push({productId})
    await cart.save();



    return res.json({message : 'success',cart});
}

export const remove = async(req,res)=>{

    const {productId} = req.params;

   const cart =  await CartModel.findOneAndUpdate({userUd:req.user._id},{
        $pull:{
            products:{
                productId:productId
            }

        }

    },{new:true})

    return res.json({message:'success',cart})
}

export const updateQuantity = async(req,res)=>{

    const {quantity,operator} = req.body;

    const inc = (operator == '+')?quantity:-quantity

    const cart = await CartModel.findOneAndUpdate({userId:req.user._id,"products.productId" : req.params.productId},

        {

            $inc:{
                "products.$.quantity" : inc
               
            }

        },
        {
            new : true
        }

    )

    return res.json({message : "success",cart})
    

}

export const clearCart = async(req,res)=>{
    const cart  = await CartModel.findOneAndUpdate({
        userId:req.user._id,

},{
    products:[],
},{
    new : true
}
)
return res.json({message : 'done'})
}

