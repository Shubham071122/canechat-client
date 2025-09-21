import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const PopupMenu = ({ onClose }) => {
  const [showConfirm, setShowConfirm] = useState({ remove: false, block: false });

  const popupMenuRef = useRef(null);

  // Confirm action modal
  const ConfirmModal = ({ action, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex justify-center items-center bg-black dark:bg-gray-200 dark:bg-opacity-20 bg-opacity-30">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-11/12 sm:w-80">
        <p className="text-center mb-4 text-gray-900 dark:text-gray-200">
          Are you sure you want to {action} this user?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg capitalize"
            onClick={onConfirm}
          >
            {action}
          </button>
          <button
            className="px-4 py-2 dark:text-white bg-gray-300 dark:bg-gray-600 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Handle actions for remove friend and block
  const handleRemoveFriend = () => {
    setShowConfirm({ remove: true, block: false });
  };

  const handleBlock = () => {
    setShowConfirm({ remove: false, block: true });
  };

  const handleConfirmRemove = () => {
    toast.success('Friend removed successfully.');
    setShowConfirm({ remove: false, block: false });
    onClose();
  };

  const handleConfirmBlock = () => {
    toast.success('User blocked successfully.');
    setShowConfirm({ remove: false, block: false });
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
        if(popupMenuRef.current && !popupMenuRef.current.contains(e.target)){
            onClose();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.addEventListener('mousedown', handleClickOutside);
    }
  },[])

  return (
    <>
      <div 
      ref={popupMenuRef}
      className="absolute top-12 right-6 bg-white dark:bg-slate-500 shadow-lg p-3 rounded-lg z-50">
        <ul>
          <li className="px-4 py-2 dark:text-white hover:bg-gray-100 rounded-md dark:hover:bg-slate-400 cursor-pointer">
            View Profile
          </li>
          <li
            className="px-4 py-2 dark:text-white hover:bg-gray-100 rounded-md dark:hover:bg-slate-400 cursor-pointer"
            onClick={handleRemoveFriend}
          >
            Remove Friend
          </li>
          <li
            className="px-4 py-2 dark:text-white hover:bg-gray-100 rounded-md dark:hover:bg-slate-400 cursor-pointer"
            onClick={handleBlock}
          >
            Block
          </li>
        </ul>
      </div>

      {/* Confirmation Modals */}
      {showConfirm.remove && (
        <ConfirmModal
          action="remove"
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowConfirm({ remove: false, block: false })}
        />
      )}
      {showConfirm.block && (
        <ConfirmModal
          action="block"
          onConfirm={handleConfirmBlock}
          onCancel={() => setShowConfirm({ remove: false, block: false })}
        />
      )}
    </>
  );
};

export default PopupMenu;
