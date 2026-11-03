import { z } from "zod";
import { mongoIdSchema } from "./common.validator.js";

export const mongoIdParamsSchema = z.object({
    id: mongoIdSchema
});
