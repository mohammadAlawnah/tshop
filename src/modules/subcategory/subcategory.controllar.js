import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.js";
import cloudinary from "../../utls/cloudinary.js";


export const create = async (req, res) => {


    const { categorieId } = req.body

    const categorie = await categoryModel.findById(categorieId)

    if (!categorie) {
        return res.status(404).json({ message: "category not finde" });
    }




    req.body.name = req.body.name.toLowerCase();

    const { name } = req.body;

    console.log(name)

    if (await categoryModel.findOne({ name })) {
        return res.status(409).json({ message: "category already exists" })
    }


    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APPNAME}/subcategories`
    })

    req.body.image = { secure_url, public_id }



    const slug = slugify(name)

    const subcategoriy = await subcategoryModel.create({ name, slug, image: { secure_url, public_id }, categoryId: categorieId, createdBy: req.user._id, updateBy: req.user._id })

    res.json({ message: subcategoriy })
}


// www.tshop.com/category/:id/subcategory/
export const getAll = async (req, res) => {
    const { id } = req.params;//Category Id 

    const categories = await subcategoryModel.find({ categoryId: id }); // يوجد كل ال sub category لل categoryId

    return res.status(200).json({ message: categories })

}

//www.tshop.com/category/:id/subcategory/
// export const getAll = async(req,res)=>{
//     const {id} = req.params;
//     return res.json({id})
// }


export const getActive = async (req, res) => {
    const categories = await categoryModel.find({ status: 'Active' }.select("name"));
    return res.status(200).json({ message: categories })
}




export const getSupCategory = async (req, res) => {
    const { id } = req.params;
    const category = await subcategoryModel.findById(id)
    return res.status(200).json({ message: category })

}



export const updateCategory = async (req, res) => {
    const { id } = req.params;

    const categorie = await subcategoryModel.findById(id)


    if (!categorie) {
        return res.status(404).json({ message: "catigory not found" })
    }
    console.log(req.body.name)

    categorie.name = req.body.name.toLowerCase();

    if (await subcategoryModel.findOne({ name: req.body.name, _id: { $ne: req.params.id } })) {
        return res.status(409).json({ message: "category alreade exiset" })
    }

    categorie.slug = slugify(req.body.name);

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: 'thop/categories'
        })
        cloudinary.uploader.destroy(categorie.image.public_id)

        categorie.image = { secure_url, public_id }
    }

    categorie.status = req.body.status

    categorie.updateBy = req.user._id

    await categorie.save();

    return res.json({ message: "succesess", categorie })
}


export const destroy = async (req, res) => {
    const categorie = await categoryModel.findByIdAndDelete(req.params.id)

    if (!categorie) {
        return res.status(404).json({ message: "category not found" });
    }

    await cloudinary.uploader.destroy(categorie.image.public_id)

    return res.status(200).json({ message: 'success', categorie })
}

