import { Router } from "express";
import * as userControllar from './user.controllar.js'
import { endPoints } from "./user.role.js";
import { auth } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
const router = Router();

router.get('/',asyncHandler(auth(endPoints.getUsers)),asyncHandler(userControllar.getUsers))
router.get('/userData',asyncHandler(auth(endPoints.userData)),asyncHandler(userControllar.getUserData))


export default router;