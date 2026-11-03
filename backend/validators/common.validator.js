
import { z } from "zod";
import mongoose from "mongoose";

// First Name
export const firstNameSchema = z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, "Invalid first name.");

// Last Name
export const lastNameSchema = z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .regex(/^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u, "Invalid last name.");

// Email
export const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address.")
    .max(254, "Email is too long.");

// Password
export const passwordSchema = z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters.");

// Username
export const usernameSchema = z
    .string()
    .trim()
    .min(3, "Username must contain at least 3 characters.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscores."
    );

// MongoDB ObjectId
export const mongoIdSchema = z
    .string()
    .refine(
        (id) => mongoose.isObjectIdOrHexString(id),
        "Invalid MongoDB ObjectId."
    );

// Post Content (Plain Text)
export const postContentSchema = z
    .string()
    .trim()
    .min(1, "Post content cannot be empty.")
    .max(5000, "Post content cannot exceed 5000 characters.");

// Bio
export const bioSchema = z
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters.");

// Website URL
export const websiteSchema = z
    .string()
    .trim()
    .url("Please provide a valid URL.")
    .max(2048, "URL is too long.");
