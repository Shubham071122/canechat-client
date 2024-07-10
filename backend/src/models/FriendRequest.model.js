import mongoose, { mongo, Schema } from "mongoose";

const friendRequestSchema = Schema(
    {
        fromuser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        toUser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        status: { type: String, 
            enum: ['pending', 'accepted', 'rejected'], 
            default: 'pending' 
        },
    }
);

export const FriendRequest = mongoose.model("FriendRequest",friendRequestSchema);