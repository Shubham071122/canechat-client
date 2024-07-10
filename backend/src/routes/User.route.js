import { Router } from 'express';
import {upload} from '../middlewares/multer.middelware.js'
import { verifyJWT } from '../middlewares/auth.middelware.js';
import { acceptFriendRequest, changeCurrentPassword, deleteAccount, forgetPassword, getCurrentUser, getFriends, getUserById, loginUser, logoutUser, refreshAccessToken, registerUser, rejectFriendRequest, resetPassword, sendFriendRequest, updateAccountDetails, updateUserAvatar } from '../controllers/User.controller.js';

const router = Router();

router.route("/register").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1,
    },
]),registerUser);
router.route("/login").post(loginUser);
router.route("/forgot-password").post(forgetPassword);
router.route("/reset-password").post(resetPassword);

router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changeCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/u/avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar);
router.route("/update-account").patch(verifyJWT,updateAccountDetails)
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/u/:userId").get(verifyJWT,getUserById);
router.route("/delete-account").post(verifyJWT,deleteAccount)
router.route("/get-friends").get(verifyJWT,getFriends);
router.route("/send-request").post(verifyJWT,sendFriendRequest);
router.route("/accept-request").post(verifyJWT,acceptFriendRequest);
router.route("/reject-request").post(verifyJWT,rejectFriendRequest);

export default router;
