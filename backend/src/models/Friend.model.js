import mongoose, {Schema} from "mongoose";

const friendSchema = new Schema(
    {
        currentUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        friend: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }
);

export const Friend = mongoose.model("Friend",friendSchema);
