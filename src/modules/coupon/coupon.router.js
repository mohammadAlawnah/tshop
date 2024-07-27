import { Router } from "express";
import * as couponControllar from './coupon.controllar.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./coupon.role.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import * as schema from './coupon.validation.js'

const router = Router();

router.post('/',validation(schema.createCouponSchema),asyncHandler(auth(endPoints.create)),asyncHandler(couponControllar.create))

export default router
