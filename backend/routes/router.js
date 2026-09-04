import express from 'express';
import { createUserPost, deleteUserPost, fetchPost, getLoggedUserProfile, updateUserPost } from '../controllers/serverController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

const router = express.Router();

//here every route requires jwt verification thats why we are using authMiddleware globally
//but in authRouter we cannot use it globally;
router.use(authMiddleWare);

router.get("/mockPost", fetchPost);

router.post("/mockPost", createUserPost);

//for delete post;
//id will be of the post whicch will be clicked for removal;
router.delete("/mockPost/:id", deleteUserPost);

//for update functionality
router.patch("/mockPost/:id", updateUserPost);


//for logged user profile(get);
router.get("/user", getLoggedUserProfile);
export default router;