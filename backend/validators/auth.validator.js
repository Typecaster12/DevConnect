
import { z } from "zod";

import {
    firstNameSchema,
    lastNameSchema,
    emailSchema,
    passwordSchema,
    usernameSchema
} from "./common.validator.js";

// Registration
export const registerSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});

// Login
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});
