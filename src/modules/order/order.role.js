import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    create :[roles.Admin , roles.User],
    all:[roles.Admin],
    getOrder:[roles.User],
    changeStatus:[roles.Admin],
}
