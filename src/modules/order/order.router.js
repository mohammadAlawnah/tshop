import { Router } from "express";
import * as couponControllar from './order.controllar.js';
import { auth } from "../../middleware/auth.middleware.js";
import { endPoints } from "./order.role.js";
import { asyncHandler } from "../../utls/asyncHandler.js";


const router = Router();

router.post('/',asyncHandler(auth(endPoints.create)),asyncHandler(couponControllar.create))
router.get('/all',asyncHandler(auth(endPoints.all)),asyncHandler(couponControllar.getOrder))
router.get('/userOrders',asyncHandler(auth(endPoints.getOrder)),asyncHandler(couponControllar.getUserOrders))
router.patch('/changeStatus/:orderId',asyncHandler(auth(endPoints.changeStatus)),asyncHandler(couponControllar.changeStatus))

export default router
