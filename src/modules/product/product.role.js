import { roles } from "../../middleware/auth.middleware.js";

export const endPoint = {
    create : [roles.Admin],
}