import express from 'express';
import { createUserPost, deleteUserPost, fetchMockPost } from '../controllers/serverController.js';
// import { checkingHome } from '../controllers/serverController.js';

const router = express.Router();

// router.get("/", checkingHome);
router.get("/mockPost", fetchMockPost);
router.post("/mockPost", createUserPost);
//for delete post;
//id will be of the post whicch will be clicked for removal;
router.delete("/mockPost/:id", deleteUserPost);
export default router;