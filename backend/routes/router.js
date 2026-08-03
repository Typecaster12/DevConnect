import express from 'express';
import { fetchMockPost } from '../controllers/serverController.js';
// import { checkingHome } from '../controllers/serverController.js';

const router = express.Router();

// router.get("/", checkingHome);
router.get("/mockPost", fetchMockPost);

export default router;