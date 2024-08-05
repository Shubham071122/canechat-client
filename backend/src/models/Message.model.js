import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        recipient : {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: String,
            required: true,
        },
        edited: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

export const Message = mongoose.model("Message", messageSchema);
