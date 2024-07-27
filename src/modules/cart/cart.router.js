import { Router } from "express";
import * as cartControllar from './cart.controllar.js'
import { auth, roles } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.role.js";
import { asyncHandler } from "../../utls/asyncHandler.js";
import { validation } from "../../middleware/validation.js";
import * as schema from './cart.validation.js'
const router = Router({caseSensitive:true});

router.get('/',asyncHandler(auth(endPoints.create)),asyncHandler(cartControllar.get))
router.post('/',validation(schema.createCartSchema),asyncHandler(auth(endPoints.delete)),asyncHandler(cartControllar.create));
router.put('/clear',asyncHandler(auth(endPoints.delete)),asyncHandler(cartControllar.clearCart));
router.put('/updateQuantity/:productId',asyncHandler(auth(endPoints.create)),asyncHandler(cartControllar.updateQuantity))
router.put('/:productId',asyncHandler(auth(endPoints.delete)),asyncHandler(cartControllar.remove));

export default router;
