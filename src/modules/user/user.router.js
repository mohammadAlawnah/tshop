import { Router } from "express";
import * as userControllar from './user.controllar.js'

const router = Router();

router.get('/',userControllar.getUser)



export default router;