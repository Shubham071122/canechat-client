import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middelware.js';
import { getFriends,sendFriendRequest,acceptFriendRequest,rejectFriendRequest, getFriendRequests, blockUser, unblockUser } from '../controllers/Friend.controller.js';

const router = Router();

router.route("/get-friends").get(verifyJWT,getFriends);
router.route("/send-request").post(verifyJWT,sendFriendRequest);
router.route("/accept-request").post(verifyJWT,acceptFriendRequest);
router.route("/reject-request").post(verifyJWT,rejectFriendRequest);
router.route("/get-all-request").post(verifyJWT,getFriendRequests);
router.route("/block-user").post(verifyJWT,blockUser);
router.route("/unblock-user").post(verifyJWT,unblockUser);

export default router;