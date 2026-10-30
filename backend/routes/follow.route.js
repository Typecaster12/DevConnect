import express from 'express';
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { followRelation, isFollowingUser, unFollowRelation } from '../controllers/follow.controller.js';

const followRouter = express.Router();

followRouter.use(authMiddleWare);

followRouter.post("/follow/:id", followRelation);
followRouter.post("/unfollow/:id", unFollowRelation);
followRouter.get("/isFollowing/:id", isFollowingUser);

export default followRouter;