import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.js";
import slugify from "slugify";
import cloudinary from "../../utls/cloudinary.js";
import productModel from "../../../DB/model/product.model.js";
//  8:12
export const getProduct = (req,res)=>{
    res.json({message : "sucsecc"})
}
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
