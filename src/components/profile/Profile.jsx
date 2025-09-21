import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { MdPhotoCamera } from 'react-icons/md';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';
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
    <section className="w-full h-screen overflow-y-auto">
      <div className="relative flex flex-col m-3 sm:m-8 bg-gray-100 dark:bg-gray-800 p-5 py-10 sm:p-10 rounded-lg shadow-lg">
        <div className="relative border rounded-full overflow-hidden w-32 h-32 mb-4 mx-auto">
          <img
            src={userData.avatar}
            alt="profile"
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-2 right-2 transform translate-x-1/2 translate-y-1/2 p-1 bg-black bg-opacity-50 rounded-full">
            <MdPhotoCamera className="text-2xl text-white" />
          </button>
        </div>
        <div className=" my-6 flex flex-col gap-2 sm:gap-5 ">
          <div className="flex items-center  gap-3 text-gray-900 dark:text-gray-100 border-y py-5 ">
            <p>Name:</p>
            <p
              className={`w-full text-gray-700 dark:text-gray-300 p-2 rounded-md`}
            >
              <input
                type="text"
                value={fullName}
                onChange={handleNameChange}
                className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border"
              />
            </p>
          </div>
          <div className="flex gap-3 text-gray-900 dark:text-gray-100  border-b pb-5 ">
            <p>Username:</p>
            <p className="text-gray-700 dark:text-gray-300">
              {userData?.userName}
            </p>
          </div>
          <div className="flex gap-3 text-gray-900 dark:text-gray-100  border-b pb-5 ">
            <p>Email:</p>
            <p className="text-gray-700 dark:text-gray-300">
              {userData?.email}
            </p>
          </div>
        </div>
        {/* Save Button */}
        <div className="flex space-x-4 mb-4 justify-end">
          <button
            onClick={hadleEdit}
            disabled={!nameChanged}
            className={`${
              nameChanged
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white px-4 py-2 rounded-lg transition duration-300`}
          >
            Save
          </button>
        </div>

        <div className="my-4 w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            value={oldPassword}
            onChange={handleOldPasswordChange}
            placeholder="Old Password"
            className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border mb-3"
          />

          <div className="relative">
            <input
              value={newPassword}
              onChange={handleNewPasswordChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 text-base"
            >
              {showPassword ? (
                <BsFillEyeSlashFill className="text-xl" />
              ) : (
                <BsFillEyeFill className="text-xl" />
              )}
            </button>
          </div>
          {/* Update Password Button */}
          <div className="flex space-x-4 mb-4 justify-end mt-5">
            <button
              onClick={handlePasswordChange}
              disabled={!canUpdatePassword || passLoading}
              className={`${
                canUpdatePassword
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white px-4 py-2 rounded-lg transition duration-300`}
            >
              {passLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>

        <div className="w-full bg-red-300 p-5 rounded-md mt-10">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Delete Account</h3>
            <p className="text-sm">
              Would you like to delete account?<br></br>
              Deleting your account will permanently remove all the chat and
              data associated with it.
              <span className="italic">
                Your Chat , Friend and all Infromantion.
              </span>
              And you no more able to recover it!
            </p>
          </div>
          <button
            onClick={() => setShowDeletePopup(true)}
            className="mt-5 px-4 py-2 bg-red-600 text-white rounded-md shadow-md flex items-center italic"
          >
            I want to delete
            <RiDeleteBin6Line className="text-lg ml-2" />
          </button>
        </div>
        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="bg-gray-100 dark:bg-gray-700 p-5 sm:p-8 rounded-lg shadow-lg mx-10 sm:mx-0">
              <div className="w-full flex items-center justify-center">
                <FaExclamationCircle className="w-12 sm:w-16 h-12 sm:h-16 text-red-700 text-center mb-4" />
              </div>
              <h2 className="text-xl font-bold mb-4 text-center text-black dark:text-gray-100">
                Confirm Delete Account
              </h2>
              <p className="mb-4 text-black dark:text-gray-100">
                Please enter your email to confirm account deletion:
              </p>
              <form onSubmit={handleDeleteAccount}>
                <input
                  type="email"
                  name="deleteEmail"
                  value={deleteEmail}
                  onChange={(e) => setDeleteEmail(e.target.value)}
                  placeholder="email"
                  className="p-2 w-full border rounded-md shadow-sm mb-4 dark:bg-gray-300"
                  required
                />
                {delError && <p className="text-red-500 mt-2">{delError}</p>}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowDeletePopup(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md w-20 flex items-center justify-center"
                    disabled={delLoading}
                  >
                    {delLoading ? (
                      <FaSpinner className="animate-spin text-xl" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;
