import  {Router} from 'express';
import { auth } from '../../middleware/auth.middleware.js';
import { endPoint } from '../product/product.role.js';
import * as reviewControllar from './../review/review.controllar.js'
import fileUpload, { filleType } from '../../utls/multer.js';
import { asyncHandler } from '../../utls/asyncHandler.js';
const router = Router({mergeParams:true});


router.post('/',asyncHandler(auth(endPoint.create)),fileUpload(filleType.image).single('image'),asyncHandler(reviewControllar.addReview))


export default router;
