import { Router } from "express";
import * as productControllar from './product.controllar.js'
import fileUpload, { filleType } from "../../utls/multer.js";
import { endPoint } from "./product.role.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = Router();

// router.use('/',productControllar.getProduct)

router.post('/',auth(endPoint.create), fileUpload(filleType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImages',maxCount:5},

]),productControllar.create);




export default router;