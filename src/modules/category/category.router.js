import { Router } from "express";
import * as categoryControllar from './category.controllar.js'
import fileUpload, {filleType } from "../../utls/multer.js";
import { auth, roles } from "../../middleware/auth.middleware.js";
import subcategoryRouter from './../subcategory/subcategory.router.js'
import { endPoints } from "./category.role.js";

const router = Router({caseSensitive:true});

// id ----->category

router.use('/:id/subcategory',subcategoryRouter)
router.post('/',auth(endPoints.create),fileUpload(filleType.image).single('image'),categoryControllar.create)

router.get('/',categoryControllar.getAll)


router.get('/active',auth(endPoints.get),categoryControllar.getActive)
router.get('/:id',categoryControllar.getCategory)
router.patch('/:id',auth(endPoints.create),fileUpload(filleType.image).single('image'),categoryControllar.updateCategory)
router.delete('/:id',auth(endPoints.delete),categoryControllar.destroy)


export default router;

/*

1 - www.tshop.com /category/15442/subcategory/getall  ==> false
2 - www.tshop.com /subcategory/15442/getall   ==> true


*/

