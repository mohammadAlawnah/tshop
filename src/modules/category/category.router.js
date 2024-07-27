import { Router } from "express";
import * as categoryControllar from './category.controllar.js'
import fileUpload, {filleType } from "../../utls/multer.js";
import { auth, roles } from "../../middleware/auth.middleware.js";
import subcategoryRouter from './../subcategory/subcategory.router.js'
import { endPoints } from "./category.role.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import * as schema from './category.validation.js'

const router = Router({caseSensitive:true});

// id ----->category
router.use('/:id/subcategory',asyncHandler(subcategoryRouter))
router.post('/',auth(endPoints.create),fileUpload(filleType.image).single('image'),validation(schema.createCategorySchema),asyncHandler(categoryControllar.create))

router.get('/',asyncHandler(categoryControllar.getAll))

router.get('/active',asyncHandler(auth(endPoints.get)),asyncHandler(categoryControllar.getActive))

router.get('/:id',asyncHandler(categoryControllar.getCategory))

router.patch('/:id',asyncHandler(auth(endPoints.create)),fileUpload(filleType.image).single('image'),asyncHandler(categoryControllar.updateCategory))

router.delete('/:id',asyncHandler(auth(endPoints.delete)),validation(schema.deleteCategorySchema),asyncHandler(categoryControllar.destroy))


export default router;




/*

1 - www.tshop.com /category/15442/subcategory/getall  ==> false

2 - www.tshop.com /subcategory/15442/getall   ==> true

*/