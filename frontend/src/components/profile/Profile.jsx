import React, { useState } from 'react';
// import img1 from '../../assets/avatarplaceholder.png';
import img1 from '../../assets/shubham.png';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaExclamationCircle } from 'react-icons/fa';
import { FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { MdPhotoCamera } from 'react-icons/md';

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');
  const [delError, setDelError] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const { userData } = useAuth();

  const [name, setName] = useState(userData?.fullName || '');
  const [userName, setUserName] = useState(userData?.userName || '');
  const [email, setEmail] = useState(userData?.email || '');

  const hadleEdit = () => setIsEdit(!isEdit);
  const handleUpdatePassword = () => setShowPasswordPopup(!showPasswordPopup);
  const handleDeleteAccount = () => {
    console.log('Delete account');
  };

  const handleNameChange = (e) => setName(e.target.value);

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
              className={`w-full text-gray-700 dark:text-gray-300 ${
                isEdit ? 'p-0' : 'p-2'
              } rounded-md`}
            >
              {isEdit ? (
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border"
                />
              ) : (
                name
              )}
            </p>
          </div>
          <div className="flex gap-3 text-gray-900 dark:text-gray-100  border-b pb-5 ">
            <p>Username:</p>
            <p className="text-gray-700 dark:text-gray-300">{userName}</p>
          </div>
          <div className="flex gap-3 text-gray-900 dark:text-gray-100  border-b pb-5 ">
            <p>Email:</p>
            <p className="text-gray-700 dark:text-gray-300">{email}</p>
          </div>
        </div>
        <div className="flex space-x-4 mb-4 justify-end">
          <button
            onClick={hadleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="my-4 w-full">
          <input
            type="password"
            placeholder="Old Password"
            className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border mb-3"
          />
          <input
            type="password"
            placeholder="New Password"
            className="rounded w-full bg-gray-200 dark:text-gray-300 outline-none p-2 dark:bg-slate-700 border"
          />
          <div className="flex space-x-4 mb-4 justify-end mt-5">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Update Password
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
