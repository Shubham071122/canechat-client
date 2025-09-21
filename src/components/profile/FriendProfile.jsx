import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaAt,
  FaUserPlus,
  FaCheckCircle,
  FaCalendarAlt,
  FaUserMinus,
  FaBan,
  FaUserCheck,
  FaTimes,
} from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import img1 from "../../assets/avatarplaceholder.png";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function FriendProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    fetchUser,
    getUser,
    isUserLoading,
    getUserError,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriendUser,
    blockUser,
  } = useUser();

  const userData = getUser(userId);
  const loading = isUserLoading(userId);
  const error = getUserError(userId);

  console.log("User Data:", userData);
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId, fetchUser]);

  const handleAddFriend = async () => {
    if (!userData) return;

    try {
      await sendFriendRequest(userData.userName, userId);
    } catch (error) {
      console.log("Error sending friend request:", error);
    }
  };

  const handleAcceptFriend = async () => {
    if (!userData) return;

    try {
      await acceptFriendRequest(userData.requestId, userId);
    } catch (error) {
      console.log("Error accepting friend request:", error);
    }
  };

  const handleRejectFriend = async () => {
    if (!userData) return;

    try {
      await rejectFriendRequest(userData.requestId, userId);
    } catch (error) {
      console.log("Error rejecting friend request:", error);
    }
  };

  const handleUnfriend = async () => {
    if (!userData) return;

    try {
      await unfriendUser(userData.userName, userId);
    } catch (error) {
      console.log("Error unfriending user:", error);
    }
  };

  const handleBlockUser = async () => {
    if (!userData) return;

    try {
      await blockUser(userData.userName, userId);
    } catch (error) {
      console.log("Error blocking user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (loading) {
    return (
      <section className="w-full h-full bg-white dark:bg-gray-900">
        {/* Loading Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
          <div className="w-9"></div>
        </div>

        {/* Loading Content */}
        <div className="flex flex-col items-center p-6 space-y-6">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="space-y-4 w-full max-w-md">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!userData && !loading) {
    return (
      <section className="w-full h-full bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {error ? "Error loading profile" : "User not found"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {error ? error : "The user profile could not be loaded."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-full bg-white dark:bg-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <IoArrowBack className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Profile
        </h1>
        <div className="w-9"></div>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col items-center p-6 space-y-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg">
            <img
              src={userData.avatar || img1}
              alt="profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = img1;
              }}
            />
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full ring-4 ring-white dark:ring-gray-800"></div>
        </div>

        {/* Profile Info Cards */}
        <div className="w-full max-w-md space-y-4">
          {/* Name Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {userData.fullName}
                </p>
              </div>
              <FaCheckCircle className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          {/* Username Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaAt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Username
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {userData.userName}
                </p>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </p>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Join Date Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <FaCalendarAlt className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Member Since
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(userData.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-3 pt-4">
          {userData.friendshipStatus === "accepted" ? (
            <div className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 font-semibold py-3 px-6 rounded-xl">
              <FaCheckCircle className="w-5 h-5" />
              <span>Friends</span>
            </div>
          ) : userData.friendshipStatus === "pending" ? (
            userData.sentByCurrentUser ? (
              // Current user sent the request - show "Friend Request Sent"
              <div className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 border border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 font-semibold py-3 px-6 rounded-xl">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Friend Request Sent</span>
              </div>
            ) : (
              // Current user received the request - show Accept/Reject buttons
              <div className="w-full space-y-3">
                
                <div className="flex gap-3">
                  <button
                    onClick={handleAcceptFriend}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FaUserCheck className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  
                  <button
                    onClick={handleRejectFriend}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FaTimes className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            <button
              onClick={handleAddFriend}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <FaUserPlus className="w-5 h-5" />
              <span>Add Friend</span>
            </button>
          )}

          {userData.friendshipStatus === "accepted" && (
            <button
              onClick={handleUnfriend}
              className="w-full flex items-center justify-center space-x-3 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-600 text-red-700 dark:text-red-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              <FaUserMinus className="w-5 h-5" />
              <span>Unfriend</span>
            </button>
          )}

          <button
            onClick={handleBlockUser}
            className="w-full flex items-center justify-center space-x-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            <FaBan className="w-5 h-5" />
            <span>Block User</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default FriendProfile;
