import { Router } from "express";
import * as authControllar from './aut.controllar.js'
import { checkEmail } from "../../middleware/checkEmail.middleware.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import * as schema from './auth.validation.js'
const router = Router();

router.get('/',asyncHandler(authControllar.getAuth));
router.post('/register',validation(schema.registerSchem),asyncHandler(checkEmail),asyncHandler(authControllar.register))
router.post('/login',validation(schema.loginSchem),asyncHandler(authControllar.login))
router.patch('/sendCode',validation(schema.sendCodeSchema),asyncHandler(authControllar.sendCode))




export default router;