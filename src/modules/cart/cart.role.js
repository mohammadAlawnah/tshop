import { roles } from "../../middleware/auth.middleware.js";
import { remove } from "./cart.controllar.js";

export const endPoints = {
    create :[roles.User,roles.Admin],
    delete : [roles.User,roles.Admin],
}