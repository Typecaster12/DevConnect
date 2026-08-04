import express from 'express';
import { createUserPost, fetchMockPost } from '../controllers/serverController.js';
// import { checkingHome } from '../controllers/serverController.js';

const router = express.Router();

// router.get("/", checkingHome);
router.get("/mockPost", fetchMockPost);
router.post("/mockPost", createUserPost);
export default router;