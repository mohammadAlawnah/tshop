import { Router } from "express";
import * as cartControllar from './cart.controllar.js'
import { auth, roles } from "../../middleware/auth.middleware.js";
import { endPoints } from "./cart.role.js";

const router = Router({caseSensitive:true});

router.get('/',auth(endPoints.create),cartControllar.get)
router.post('/',auth(endPoints.delete),cartControllar.create);
router.put('/clear',auth(endPoints.delete),cartControllar.clearCart);
router.put('/updateQuantity/:productId',auth(endPoints.create),cartControllar.updateQuantity)
router.put('/:productId',auth(endPoints.delete),cartControllar.remove);

export default router;


