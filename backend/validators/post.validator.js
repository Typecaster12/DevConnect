
import { z } from "zod";
import {
    postContentSchema,
    mongoIdSchema
} from "./common.validator.js";

export const createPostSchema = z.object({
    content: postContentSchema
});

export const updatePostSchema = z.object({
    newPostContent: postContentSchema
});

export const postIdSchema = z.object({
    id: mongoIdSchema
});