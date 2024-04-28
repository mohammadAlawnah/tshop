import { Router } from "express";
import * as productControllar from './product.controllar.js'

const router = Router();

router.use('/',productControllar.getProduct)



export default router;