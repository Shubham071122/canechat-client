import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middelware.js";
import { createMessage, deleteMessage, editMessage } from "../controllers/Message.controller.js";

const router = Router();
router.use(verifyJWT);

router.route('/c/message').post(createMessage);
router.route('/d/messages').delete(deleteMessage);
router.route('/e/message').patch(editMessage);

export default router;