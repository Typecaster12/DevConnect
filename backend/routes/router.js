
import express from 'express';

import {
    createUserPost,
    deleteUserPost,
    fetchCurrentUserPosts,
    fetchPost,
    getLoggedUserProfile,
    getMatchedUsers,
    individualUserDetails,
    individualUserPosts,
    updateUserPost
} from '../controllers/server.controller.js';

import { authMiddleWare } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/reqValidators/reqValidate.js';

import {
    createPostSchema,
    updatePostSchema,
    postIdSchema
} from '../validators/post.validator.js';

const router = express.Router();

// Global JWT verification
router.use(authMiddleWare);

// Fetch posts
router.get("/posts", fetchPost);
router.get("/loggedUserPosts", fetchCurrentUserPosts);

// Create post
router.post(
    "/posts",
    validateRequest(createPostSchema),
    createUserPost
);

// Delete post
router.delete(
    "/posts/:id",
    validateRequest(postIdSchema, "params"),
    deleteUserPost
);

// Update post
router.patch(
    "/posts/:id",
    validateRequest(postIdSchema, "params"),
    validateRequest(updatePostSchema),
    updateUserPost
);

// Logged-in user's profile
router.get("/user", getLoggedUserProfile);

// Search users
router.get("/searchusers", getMatchedUsers);

// Other user's details
router.get(
    "/userProfile/:id",
    validateRequest(postIdSchema, "params"),
    individualUserDetails
);

// Other user's posts
router.get(
    "/userPosts/:id",
    validateRequest(postIdSchema, "params"),
    individualUserPosts
);

export default router;
