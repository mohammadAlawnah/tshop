import { Router } from "express";
import * as authControllar from './aut.controllar.js'

const router = Router();

router.get('/',authControllar.getAuth);
router.post('/register',authControllar.register)
router.post('/login',authControllar.login)
router.patch('/sendCode',authControllar.sendCode)




export default router;