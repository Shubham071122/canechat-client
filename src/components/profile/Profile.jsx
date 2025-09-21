import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaExclamationCircle, FaSpinner, FaUser, FaAt, FaEnvelope, FaLock, FaEdit, FaCamera } from 'react-icons/fa';
import { IoArrowBack, IoSave } from 'react-icons/io5';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [delLoading, setDelLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const { userData } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);

  // Track if name or password has been changed to enable buttons
  const [nameChanged, setNameChanged] = useState(false);
  const [canUpdatePassword, setCanUpdatePassword] = useState(false);

  const [fullName, setFullName] = useState(userData?.fullName || '');

  // Toggle edit mode
  const hadleEdit = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/update-account`,
          { fullName },
          { withCredentials: true },
        );
  
        if (response.data.statusCode === 200) {
          toast.success("Account detail updated!")
          setNameChanged(false);
        }
    } catch (error) {
      console.log("Error while updateing name:",error);
      toast.error("Something went wrong!");
    }
  }

  // Handle name change and detect if it has changed from the original value
  const handleNameChange = (e) => {
    setFullName(e.target.value);
    setNameChanged(e.target.value !== userData.fullName);
  };

  // Handle password input change
  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
    setCanUpdatePassword(e.target.value && newPassword); 
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setCanUpdatePassword(oldPassword && e.target.value); 
  };

  const handleDeleteAccount = () => {
    console.log('Delete account');
  };

  const handlePasswordChange = async () => {
    setPassLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true },
      );

      if (response.data.statusCode === 400) {
        toast.error(response.data.message);
        setOldPassword('');
        setPassLoading(false);
        setCanUpdatePassword(false);
      } else {
        toast.success('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setPassLoading(false);
        setCanUpdatePassword(false);
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log(
        'Error changing password:',
        error.response?.data || error.message,
      );
    } finally {
      setPassLoading(false);
      setCanUpdatePassword(false);
    }
  };

  return (
    <section className="w-full h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <IoArrowBack className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Profile</h1>
        <div className="w-9"></div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500 shadow-lg">
              <img
                src={userData.avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-colors">
              <FaCamera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{userData?.fullName}</h2>
            <p className="text-gray-500 dark:text-gray-400">{userData?.userName}</p>
          </div>
        </div>

        {/* Profile Information Cards */}
        <div className="space-y-4">
          {/* Name Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FaUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                <input
                  type="text"
                  value={fullName}
                  onChange={handleNameChange}
                  className="w-full bg-transparent text-gray-900 dark:text-gray-100 font-medium outline-none border-none focus:bg-white dark:focus:bg-gray-700 rounded px-2 py-1 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              {nameChanged && (
                <button
                  onClick={hadleEdit}
                  className="p-2 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 rounded-lg transition-colors"
                >
                  <IoSave className="w-4 h-4 text-green-600 dark:text-green-400" />
                </button>
              )}
            </div>
          </div>

          {/* Username Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FaAt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{userData?.userName}</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <FaEnvelope className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{userData?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <FaLock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Change Password</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <input
              type={showPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={handleOldPasswordChange}
              placeholder="Current Password"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            
            <div className="relative">
              <input
                value={newPassword}
                onChange={handleNewPasswordChange}
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <BsFillEyeSlashFill className="w-5 h-5" /> : <BsFillEyeFill className="w-5 h-5" />}
              </button>
            </div>
            
            <button
              onClick={handlePasswordChange}
              disabled={!canUpdatePassword || passLoading}
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                canUpdatePassword && !passLoading
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              }`}
            >
              {passLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <FaExclamationCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                Deleting your account will permanently remove all your chats, friends, and data. 
                <span className="font-semibold"> This action cannot be undone!</span>
              </p>
              <button
                onClick={() => setShowDeletePopup(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <RiDeleteBin6Line className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
                <FaExclamationCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Delete Account</h2>
              <p className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. Please enter your email to confirm.
              </p>
            </div>
            
            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <input
                type="email"
                name="deleteEmail"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                required
              />
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDeletePopup(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 rounded-lg transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={delLoading}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {delLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete Account</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
