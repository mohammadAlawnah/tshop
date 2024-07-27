import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    getUsers:[roles.Admin],
    userData:[roles.Admin,roles.User]
}
