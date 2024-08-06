import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        recipient : {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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

messageSchema.index({ sender: 1 });
messageSchema.index({ recipient: 1 });
messageSchema.index({ sender: 1, recipient: 1 });

export const Message = mongoose.model("Message", messageSchema);
