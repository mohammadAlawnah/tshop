import {model,Schema,Types} from 'mongoose'

const reviewSchema = new Schema({
    comment : {
        type:String,
        require : true,    
    },

    rating : {
        type : Number,
        require : true,
        min : 1,
        max : 5,
    },
    productId :{
        type : Types.ObjectId,
        ref : 'Product',
        require : true,
    },
    userId:{
        type : Types.ObjectId,
        ref : 'User',
        required:true
    },
    image :{
        type:Object,
    },


},{
    timestamps:true,
})

const reviewModel = model('review',reviewSchema)
export default reviewModel;