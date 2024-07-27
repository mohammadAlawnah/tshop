import { Router } from "express";
import * as productControllar from './product.controllar.js'
import fileUpload, { filleType } from "../../utls/multer.js";
import { endPoint } from "./product.role.js";
import { auth } from "../../middleware/auth.middleware.js";
import reviewRouter from './../review/review.router.js'
import { asyncHandler } from "../../utls/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import * as schema from './product.validation.js'

const router = Router();
router.use('/:productId/review',reviewRouter)

// router.use('/',productControllar.getProduct)
router.post('/',validation(schema.createProductSchema),asyncHandler(auth(endPoint.create)), fileUpload(filleType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5},

]),asyncHandler(productControllar.create));

router.get('/',asyncHandler(productControllar.getProducts))




export default router;