import { populate } from "dotenv";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify  from "slugify";


export const create = async(req,res)=>{

    req.body.name = req.body.name.toLowerCase();

    const {name} = req.body;


    if(await categoryModel.findOne({name})){
        return res.status(409).json({message:"category already exists"})
    }

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder : `${process.env.APPNAME}/categories`
    })

    req.body.image = {secure_url,public_id}


    const slug = slugify(name)

    const category = await categoryModel.create({name,slug,image:{secure_url,public_id},createdBy:req.user._id,updateBy:req.user._id})

    res.json({message : category}) 
}


export const getAll = async(req,res)=>{


    const categories = await categoryModel.find({}).populate([
    {
        path : "createdBy",
        select : 'userName',
    },
    {
        path : 'updateBy',
        select : 'userName , email',
    },
    {
        path : 'subcategory',
    }
]);
    return res.status(200).json({message : categories})
}


export const getActive = async(req,res)=>{
    const categories = await categoryModel.find({status: 'Active'}.select("name")).populate([
        {
            path : "createdBy",
            select : 'userName',
        },
        {
            path : 'updateBy',
            select : 'userName , email',
        },
        {
            path : 'subcategory',
        }
    ]);

    return res.status(200).json({message : categories})

}


export const getCategory = async(req,res)=>{
    const {id} = req.params;
    const category = await categoryModel.findById(id).populate([
        {
            path : "createdBy",
            select : 'userName',
        },
        {
            path : 'updateBy',
            select : 'userName , email',
        },
        {
            path : 'subcategory',
        }
    ]);
    return res.status(200).json({message : category})
    
}


export const updateCategory = async(req,res)=>{
    const {id} = req.params;

    const categorie = await categoryModel.findById(id)


    if(!categorie){
        return res.status(404).json({message : "catigory not found"})
    }
    console.log(req.body.name)

    categorie.name = req.body.name.toLowerCase();

    if(await categoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message : "category alreade exiset"})
    }

    categorie.slug = slugify(req.body.name);

    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder : `${process.env.APPNAME}/categories`
        })
        cloudinary.uploader.destroy(categorie.image.public_id)

        categorie.image = {secure_url,public_id}
    }
    
    categorie.status = req.body.status

    categorie.updateBy = req.user._id

    await categorie.save();

    return res.json({message : "succesess",categorie})
}


export const destroy = async(req,res)=>{
    const categorie = await categoryModel.findByIdAndDelete(req.params.id)

    if(!categorie){
        return res.status(404).json({message : "category not found"});
    }

    await cloudinary.uploader.destroy(categorie.image.public_id)

    return res.status(200).json({message : 'success',categorie})
}
