import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { followRelation } from '../controllers/follow.controller.js';

const followRouter = express.Router();

followRouter.use(authMiddleWare);

followRouter.post("/follow/:id", followRelation)

export default followRouter;