import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaUserMinus, FaBan, FaTimes } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const PopupMenu = ({ userData, onClose }) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const { unfriendUser, blockUser } = useUser();
  const { userId } = useParams();
  // const router = useNavigate();

  const popupMenuRef = useRef(null);

  const RemoveFriendModal = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 dark:bg-black/70 z-[100] backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-11/12 sm:w-96 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-orange-100 dark:bg-orange-900/20">
            <FaUserMinus className="text-2xl text-orange-500" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Remove Friend?
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This person will no longer be in your friends list, but you can add
            them again later.
          </p>

          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={handleCancelRemove}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors bg-orange-500 hover:bg-orange-600"
              onClick={handleConfirmRemove}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BlockUserModal = () => (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 dark:bg-black/70 z-[100] backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-11/12 sm:w-96 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100 dark:bg-red-900/20">
            <FaBan className="text-2xl text-red-500" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Block User?
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You won't be able to see messages from this user anymore. You can
            unblock them later from settings.
          </p>

          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={handleCancelBlock}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2.5 text-white rounded-xl font-medium transition-colors bg-red-500 hover:bg-red-600"
              onClick={handleConfirmBlock}
            >
              Block
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleRemoveFriend = () => {
    setShowRemoveModal(true);
  };

  const handleBlock = () => {
    setShowBlockModal(true);
  };

  const handleViewProfile = () => {
    // router.push(`/user/f/${userId}`);
    toast.success("Opening profile...");
    onClose();
  };

  const handleConfirmRemove = async () => {
    if (!userData) return;

    try {
      await unfriendUser(userData.userName, userId);
    } catch (error) {
      console.log("Error unfriending user:", error);
    } finally {
      setShowRemoveModal(false);
      onClose();
    }
  };

  const handleConfirmBlock = async () => {
    if (!userData) return;

    try {
      await blockUser(userData.userName, userId);
    } catch (error) {
      console.log("Error blocking user:", error);
    } finally {
      setShowBlockModal(false);
      onClose();
    }
  };

  const handleCancelRemove = () => {
    setShowRemoveModal(false);
    onClose();
  };

  const handleCancelBlock = () => {
    setShowBlockModal(false);
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showRemoveModal || showBlockModal) return;

      if (popupMenuRef.current && !popupMenuRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, showRemoveModal, showBlockModal]);

  const menuItems = [
    {
      icon: <FaUser className="text-blue-500" />,
      label: "View Profile",
      onClick: handleViewProfile,
      className: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      icon: <FaUserMinus className="text-orange-500" />,
      label: "Remove Friend",
      onClick: handleRemoveFriend,
      className: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    },
    {
      icon: <FaBan className="text-red-500" />,
      label: "Block User",
      onClick: handleBlock,
      className: "hover:bg-red-50 dark:hover:bg-red-900/20",
    },
  ];

  return (
    <>
      <div
        ref={popupMenuRef}
        className="absolute top-3 right-1 bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 z-50 w-44 py-2 backdrop-blur-sm"
      >
        {/* Menu Items */}
        <div className="py-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${item.className}`}
            >
              <span className="mr-3 text-base">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmation Modals */}
      {showRemoveModal && <RemoveFriendModal />}
      {showBlockModal && <BlockUserModal />}
    </>
  );
};

export default PopupMenu;
