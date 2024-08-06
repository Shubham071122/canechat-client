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
    const userId = req.user._id;

    if (!messageId) {
        throw new ApiError(400, "Message id is required!");
    }

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            throw new ApiError(400, "Message not found");
        }

        if (message.sender.toString() !== userId.toString() &&
            message.recipient.toString() !== userId.toString()) {
            throw new ApiError(403, "Unauthorized to delete this message");
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
    const userId = req.user._id;

    if (!messageId || !message) {
        throw new ApiError(
            400,
            "Message ID and message content are required!"
        );
    }

    try {
        const existingMessage = await Message.findById(messageId);

        if (!existingMessage) {
            throw new ApiError(400, "Message not found");
        }

        if (!existingMessage.sender.equals(userId)) {
            throw new ApiError(403, "Unauthorized to edit this message");
        }

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            {
                $set: {
                    message: message,
                    edited: true, 
                },
            },
            { new: true } 
        );

        return res
            .status(200)
            .json(
                new ApiResponse(200, updatedMessage, "Message updated successfully")
            );
    } catch (error) {
        console.log("Error while editing message:", error);
        throw new ApiError(500, "Internal sever error");
    }
});

//***** FETCH SENDER MESSAGE (i sended) ***** */
const fetchSentMessages = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {recipient} = req.body;

    if(!recipient){
        throw new ApiError(400,"Recipient id is required");
    }

    // Fetching sender and recipient IDs
    const recipientUser = await User.findOne({ userName: recipient });

    if (!recipientUser) {
        throw new ApiError(404, "Recipient not found");
    }

    try {
        const sentMessages = await Message.find({ sender: userId, recipient: recipientUser._id  })
            .populate({
                path: "recipient",
                select: "userName",
            })
            .select("_id message recipient createdAt updatedAt");

        const formattedMessages = sentMessages.map((msg) => ({
            mesageId: msg._id,
            message: msg.message,
            recipientUserName: msg.recipient.userName,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
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
    const { sender } = req.body;

    if(!sender){
        throw new ApiError(400,"Sender id is required");
    }

    // Fetching sender ID
    const senderUser = await User.findOne({ userName: sender });

    if (!senderUser) {
        throw new ApiError(404, "Sender not found");
    }

    try {
        const receivedMessages = await Message.find({ sender: senderUser._id, recipient: userId })
            .populate({
                path: "sender",
                select: "userName",
            })
            .select("_id message sender createdAt updatedAt");

        const formattedMessages = receivedMessages.map((msg) => ({
            mesageId: msg._id,
            message: msg.message,
            senderUserName: msg.sender.userName,
            createdAt: msg.createdAt,
            updatedAt: msg.updatedAt,
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
