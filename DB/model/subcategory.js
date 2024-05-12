import {model,Schema,Types} from 'mongoose'

const subcategorySchema = new Schema({
    name : {
        type:String,
        unique:true,
        require : true,    
    },

    slug : {
        type : String,
        require : true,
    },

    image :{
        type:Object,
        require:true,
    },

    status : {
        type : String,
        default : 'Active',
        enum : ['Active','NotActive'],
    },

    categoryId : {
        type : Types.ObjectId,
        ref : 'Category',
        require:true,
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
    timestamps:true,
})

const subcategoryModel = model('Subcategory',subcategorySchema)
export default subcategoryModel;