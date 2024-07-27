import { Router } from "express";
import * as subcategories from './subcategory.controllar.js'
import fileUpload, {filleType } from "../../utls/multer.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utls/asyncHandler.js";

const router = Router({mergeParams:true});

router.post('/',asyncHandler(auth()),fileUpload(filleType.image).single('image'),subcategories.create)

router.get('/:id',auth(),subcategories.getAll)

router.get('/active',subcategories.getActive)
// router.get('/:id',subcategories.getCategory)

router.patch('/:id',auth(),fileUpload(filleType.image).single('image'),subcategories.updateCategory)
router.delete('/:id',auth(),subcategories.destroy)


export default router;


/*

router.get('/',auth(),subcategories.getAll) >> 

www.tshop.com/category/15442/subcategory

*/

