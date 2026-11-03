
import express from 'express';

import { authMiddleWare } from '../middleware/authMiddleware.js';

import {
    followRelation,
    isFollowingUser,
    unFollowRelation
} from '../controllers/follow.controller.js';

import { validateRequest } from '../middleware/reqValidators/reqValidate.js';
import { mongoIdParamsSchema } from '../validators/user.validator.js';

const followRouter = express.Router();

followRouter.use(authMiddleWare);

// Follow user
followRouter.post(
    "/follow/:id",
    validateRequest(mongoIdParamsSchema, "params"),
    followRelation
);

// Unfollow user
followRouter.post(
    "/unfollow/:id",
    validateRequest(mongoIdParamsSchema, "params"),
    unFollowRelation
);

// Check following status
followRouter.get(
    "/isFollowing/:id",
    validateRequest(mongoIdParamsSchema, "params"),
    isFollowingUser
);

export default followRouter;
