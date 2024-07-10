import mongoose from "mongoose";
import {Message}  from "../models/Message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//**** CREATE MESSAGE ***** */
const createMessage = asyncHandler(async (req, res) => {
    const { sender, recipient, message } = req.body;

    if (!sender || !recipient || !message) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const newMessage = await Message.create({
            sender,
            recipient,
            message,
        });
        await newMessage.save();
    
        return res
            .status(200)
            .json(new ApiResponse(200, newMessage, "Message sent successfully"))
    } catch (error) {
        console.log("Error while creating message:",error);
        throw new ApiError(500,"Internal server error");
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


export {createMessage,editMessage,deleteMessage};