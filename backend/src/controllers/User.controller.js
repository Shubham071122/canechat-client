import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { FriendRequest } from "../models/FriendRequest.model.js";
import { Friend } from "../models/Friend.model.js";

//****** GENERATE ACCESS AND REFRESH TOKEN: *******/
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log(user);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refresh and access token"
        );
    }
};

//****  REGISTER USER  **** */
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (
        [fullName, email, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(400, "User with email or already exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log("alp:", avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar not uploaded on cloudinary!");
    }

    // Create a unique username
    const baseUsername = `@${fullName.split(' ')[0].toLowerCase()}`;
    let userName = baseUsername;
    let userNameExists = await User.findOne({ userName });

    let counter = 1;
    while (userNameExists) {
        userName = `${baseUsername}_${counter}`;
        userNameExists = await User.findOne({ userName });
        counter++;
    }

    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        password,
        userName,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    console.log(createdUser);

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registring the user"
        );
    }

    return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "User Registered!"));
});

//****  LOGIN USER  **** */
const loginUser = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;
    console.log("em:", email);
    console.log("un:", userName);
    if (!userName && !email) {
        throw new ApiError(400, "username or email is required");
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }],
    });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid user credentials!");
    }
    console.log("userId:", user._id);
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const logedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: logedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully!"
            )
        );
});

//****  LOGOUT USER  **** */
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "None",
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

//****** CHANGING PASSWORD **** */
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password!");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully!"));
});

//****** MAKING REFRESH THE ACCESS TOKEN **** */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    console.log("incRfTkn:", incomingRefreshToken);

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "None",
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, { accessToken }, "Access token refreshed")
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

//******* UPDATING AVATAR ****** */
const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

//***** UPDATING THE USER ACCOUNT ***** */
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName && !email) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName: fullName,
                    email: email,
                },
            },
            {
                new: true,
            }
        ).select("-password");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "Account details updated successfully"
                )
            );
    } catch (error) {
        throw new ApiError(
            500,
            "An error occurred while updating account details"
        );
    }
});

//****** FETCHING CURRENT USER ******* */
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.user, "current user fetched successfully")
        );
});

//****** FETCHING USER ID ******* */
const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "User id is required!");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user id!");
    }

    const newUserId = new mongoose.Types.ObjectId(userId);

    if (!newUserId) {
        throw new ApiError(400, "User id is required!");
    }

    const user = await User.findById(newUserId);

    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully!"));
});

//****** DELETE ACCOUNT ******* */
const deleteAccount = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOneAndDelete({ email });

    if (!user) {
        throw new ApiError(404, "Account not found");
    }

    const delUser = await User.deleteOne({ _id: user._id });

    console.log("Del user:", delUser);

    return res
        .status(200)
        .json(new ApiResponse(200, "Account deleted successfully!"));
});
//****** FORGET PASSWORD ******* */
//forget Password
const forgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "10m",
            }
        );

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        //email configuration
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 2.2;">
            <h1 style="color: #333;">Reset Your Password</h1>
            <p>Click on the following link to reset your password:</p>
            <a href="${process.env.CLIENT_URL}/reset-password/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>The link will expire in "10 minutes".</p>
            <p>If you didn't request a password reset, please ignore this email.</p>
            <a href="${process.env.CLIENT_URL}" style="color: black;line-height: 3; text-decoration: none;">www.Can'eChat.com</a
            </div>
          `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw new ApiError(
                    500,
                    err.message,
                    "Error while sending mail"
                );
            }
            return res.status(200).json(new ApiResponse(200, "Email sent"));
        });
    } catch (error) {
        console.log("Error while sending email:", error);
        throw new ApiError(500, "Server error");
    }
});

//reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    try {
        const decodedToken = jwt.verify(
            req.params.token,
            process.env.ACCESS_TOKEN_SECRET
        );

        if (!decodedToken) {
            throw new ApiError(400, "Invalid token");
        }
        const user = await User.findOne({ _id: decodedToken._id });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res
            .status(200)
            .json(new ApiResponse(200, "Password updated successfully!"));
    } catch (error) {
        console.log("Error while reseting the password:", error);
        throw new ApiError(500, "Server Error");
    }
});

//****** SENDING FRIEND REQUEST ******* */
const sendFriendRequest = async (req, res) => {
    const { fromUser, toUser } = req.body;

    if (!fromUser || !toUser) {
        throw new ApiError(400, "User Id is required");
    }
    try {
        const friendRequest = await FriendRequest.create({ fromUser, toUser });
        await friendRequest.save();

        if (!friendRequest) {
            throw new ApiError(400, "Erro while creating collection");
        }

        return res(200).json(
            new ApiResponse(200, friendRequest, "Friend request sent")
        );
    } catch (error) {
        console.log("Error creating friend request:", error);
        throw new ApiError(500, "Internal server error");
    }
};

//****** ACCEPT FRIEND REQUEST ******* */
const acceptFriendRequest = asyncHandler(async(req,res) => {
    const {requesdId} = req.body;

    if(!requesdId){
        throw new ApiError(400,"Request id is required");
    }

    try {
        const request = await FriendRequest.findById(requesdId);
        if(!request){
            throw new ApiError(404,"Friend request not found");
        }

        if(request.status !== 'pending'){
            throw new ApiError(400,"Friend request has already been processed");
        }

        //Update status to "accepted" in both directions
        request.status = 'accepted';
        await request.save();

        //Create friend relationship
        await Friend.create(
            {
                userId: request.fromUser,
                friendId: request.touser,
            }
        );
        await Friend.create(
            {
                userId: request.toUser,
                friendId: request.fromUser,
            }
        );
        return res.status(200).json(
            new ApiResponse(200,"Frined request accepted")
        )

    } catch (error) {
        console.log("Error accepting friend request:",error);
        throw new ApiError(500,"Internal server error");
    }
});

//****** REJECT FRIEND REQUEST ******* */
const rejectFriendRequest = asyncHandler(async(req,res) => {
    const {requestId} = req.body;

    if(!requestId){
        throw new ApiError(400,"Request Id is required");
    }

    try {
        const request = await FriendRequest.findById(requestId);
        if(!request){
            throw new ApiError(404,"Friend Request not found");
        }
        if(request.status !== 'pending'){
            throw new ApiError(400,"Friend request has already been processed");
        }

        //Update status to 'rejected'
        request.status = 'rejected';
        await request.save();

        return res.status(200).json(
            new ApiResponse(200,"Friend request rejected")
        )

    } catch (error) {
        console.log("Error rejecting request:",error);
        throw new ApiError(500,"Internal server error");
    }

});

//****** GET FRIEND ******* */
const getFriends = asyncHandler(async(req,res) => {
    const {userId} = req.params;

    if(!userId) {
        throw new ApiError(400,"User Id is required");
    }
    try {
        const friends = await Friend.find({userId}).populate('friendId');
    
        return res.status(200).json(
            new ApiResponse(200,friends,"Friend fetcht successfully")
        )
    } catch (error) {
        console.log("Error fetching allfriend:",error);
        throw new ApiError(500,"Internal server error");
    }
})



export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    updateUserAvatar,
    refreshAccessToken,
    getCurrentUser,
    getUserById,
    updateAccountDetails,
    deleteAccount,
    forgetPassword,
    resetPassword,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriends,
};
