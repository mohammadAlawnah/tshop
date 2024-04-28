import { Router } from "express";
import * as authControllar from './aut.controllar.js'

const router = Router();

router.get('/',authControllar.getAuth);







export default router;