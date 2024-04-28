import { Router } from "express";
import * as categoryControllar from './category.controllar.js'

const router = Router();

router.get('/',categoryControllar.getCategory)


export default router;