import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.js";
import slugify from "slugify";
import cloudinary from "../../utls/cloudinary.js";
import productModel from "../../../DB/model/product.model.js";
import { pagination } from "../../../DB/model/pagination.js";

export const create = async(req,res)=>{

    const {name,categoryId,subcategoryId,price,discount} = req.body;

    const chaeckCatgory = await categoryModel.findById(categoryId);

    if(!chaeckCatgory){
        return res.status(404).json({message : 'category not finde'})
    }

    const cheackSubCategory = await subcategoryModel.findById(subcategoryId);

    if(!cheackSubCategory){
        return res.status.json({message : 'sub category not finde'})
    }

    if(cheackSubCategory.categoryId != categoryId){
        return res.json('The subCategory belongs to the second category')
    }

    req.body.slug = slugify(name)
    
    // req.body.finalPrice = price - (( price * (discount || 0)) / 100)

    let finalPrice = 0;

    if(discount == null){
        finalPrice = price
    }
    else{
        finalPrice = price - ((price * discount)/100);
    }

    req.body.finalPrice = finalPrice;

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder :`${process.env.APPNAME}/${name}`
    })

    req.body.mainImage = {secure_url,public_id};

    req.body.subImages = [];

    for (const file of req.files.subImages){

        const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{
            folder :`${process.env.APPNAME}/${name}/subImages`
        })

        req.body.subImages.push({secure_url,public_id});
    }

    const product = await productModel.create(req.body)

    return res.status(201).json({message : 'success',product})
}

export const getProducts =async (req,res)=>{

    const {skip,limit} = pagination(req.query.page,req.query.limit)
    let queryObj = {... req.query};
    const execQuery = ['page','limit','sort','search','fields'];

    execQuery.map((ele)=>{
        delete queryObj[ele];
    })

    queryObj = JSON.stringify(queryObj)
    queryObj = queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g,match=>`$${match}`)
    queryObj = JSON.parse(queryObj)
    const mongoswQuery =  productModel.find(queryObj).skip(skip).limit(limit)
    // .populate({
    //     path:'reviews',
    //     populate:{
    //     path : 'userId',
    //     select : 'userName'
    //     },
    // });

    if(req.query.search){

        mongoswQuery.find({

            $or:[
                {name:{$regex:req.query.search}},
                {description:{$regex:req.query.search}},   
            ]
        })
    }
    mongoswQuery.select(req.query.fields);
    
    let products = await mongoswQuery.sort(req.query.sort);

    products = products.map(product=>{
        return {
            ...product.toObject(),
            mainImage : product.mainImage.secure_url,
            subImages : product.subImages.map(img => img.secure_url)

        }
    })
    

    return res.status(200).json({message : 'success',products})
}

