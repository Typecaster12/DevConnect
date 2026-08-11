import express from 'express';
import { createUserPost, deleteUserPost, fetchMockPost, getLoggedUserProfile, updateUserPost } from '../controllers/serverController.js';
// import { checkingHome } from '../controllers/serverController.js';

const router = express.Router();

// router.get("/", checkingHome);
router.get("/mockPost", fetchMockPost);

router.post("/mockPost", createUserPost);

//for delete post;
//id will be of the post whicch will be clicked for removal;
router.delete("/mockPost/:id", deleteUserPost);

//for update functionality
router.patch("/mockPost/:id", updateUserPost);


//for logged user profile(get);
router.get("/user", getLoggedUserProfile);
export default router;