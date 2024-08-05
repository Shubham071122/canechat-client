import mongoose from "mongoose";
import { Message } from "../models/Message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

//**** CREATE MESSAGE ***** */
const createMessage = asyncHandler(async (req, res) => {
    const { sender, recipient, message } = req.body;
    const userId = req.user._id;

    console.log(sender, recipient, message);

    if (!sender || !recipient || !message) {
        throw new ApiError(400, "All fields are required");
    }

    // Fetching sender and recipient IDs
    const senderUser = await User.findOne({ userName: sender });
    const recipientUser = await User.findOne({ userName: recipient });

    if (!senderUser || !recipientUser) {
        throw new ApiError(404, "Sender or recipient not found");
    }

    // Checking if the sender is the logged-in user
    if (senderUser._id.toString() !== userId.toString()) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const newMessage = await Message.create({
            sender: senderUser._id,
            recipient: recipientUser._id,
            message,
        });
        await newMessage.save();

        return res
            .status(200)
            .json(
                new ApiResponse(200, newMessage, "Message sent successfully")
            );
    } catch (error) {
        console.log("Error while creating message:", error);
        throw new ApiError(500, "Internal server error");
    }
});

//**** DELETE MESSAGE ***** */
const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.body;

    if (!messageId) {
        throw new ApiError(400, "Message id is required!");
    }

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            throw new ApiError(400, "Message not found");
        }

        const delMessage = await Message.deleteOne({ _id: message._id });

        return res
            .status(200)
            .json(new ApiResponse(200, "Message deleted successfully"));
    } catch (error) {
        console.log("Error while deleting message:", error);
        throw new ApiError(500, "Internal server error");
    }
});

//**** EDIT MESSAGE ***** */
const editMessage = asyncHandler(async (req, res) => {
    const { messageId, message } = req.body;

    if (!messageId || !newMessageContent) {
        throw new ApiError(
            400,
            "Message ID and new message content are required!"
        );
    }

    try {
        const existingMessage = await Message.findById(messageId);

        if (!existingMessage) {
            throw new ApiError(400, "Message not found");
        }

        const upMessage = await Comment.findByIdAndUpdate(messageId, {
            $set: {
                message: message,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, upMessage, "Message updated successfully")
            );
    } catch (error) {
        console.log("Error while editing message:", error);
        throw new ApiError(500, "Internal sever error");
    }
});

//***** FETCH SENDER MESSAGE (i sended) ***** */
const fetchSentMessages = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const sentMessages = await Message.find({ sender: userId })
            .populate({
                path: "recipient",
                select: "userName",
            })
            .select("message recipient");

        const formattedMessages = sentMessages.map((msg) => ({
            message: msg.message,
            recipientUserName: msg.recipient.userName,
        }));

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    formattedMessages,
                    "Fetched sent messages successfully"
                )
            );
    } catch (error) {
        console.error("Error while fetching sent messages:", error);
        throw new ApiError(500, "Internal server error");
    }
});

//***** FETCH RECIPIENT MESSAGE (i recived) ***** */
const fetchReceivedMessages = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    try {
        const receivedMessages = await Message.find({ recipient: userId })
            .populate({
                path: "sender",
                select: "userName",
            })
            .select("message sender");

        const formattedMessages = receivedMessages.map((msg) => ({
            message: msg.message,
            senderUserName: msg.sender.userName,
        }));

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    formattedMessages,
                    "Fetched received messages successfully"
                )
            );
    } catch (error) {
        console.error("Error while fetching received messages:", error);
        throw new ApiError(500, "Internal server error");
    }
});

export {
    createMessage,
    editMessage,
    deleteMessage,
    fetchSentMessages,
    fetchReceivedMessages,
};
