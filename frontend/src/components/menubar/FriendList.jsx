import React, { useEffect, useState } from 'react';
import img1 from '../../assets/ce-logo.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function FriendList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/messages/friends-with-last-message`,
          { withCredentials: true },
        );
        if (response.status == 200) {
          console.log("res:",response.data.data);
          setFriends(response.data.data);
        } else {
          setFriends([]);
        }
      } catch (error) {
        console.log('Error while fetching last messages:', error);
        toast.error('Somenting went wrong!');
      }
    };
    fetchFriends();
  }, []);

  return (
    <section className="w-full h-screen bg-gray-100 dark:bg-slate-700 overflow-y-auto">
      <div className="h-auto my-4 flex flex-col justify-center gap-2 px-2 rounded-md">
        {friends.map((friend) => (
          <NavLink
            key={friend.friend._id}
            to={`/chat/${friend.friend._id}`}
            className={({ isActive }) =>
              `rounded-md ${
                isActive ? 'shadow-md dark:shadow-gray-900' : 'shadow'
              }`
            }
          >
            <div className="px-4 py-3 w-full flex items-start gap-6 border rounded-md">
              <div className="border-[3px] rounded-full w-12 h-12 border-gray-400 dark:border-gray-200 flex items-center justify-center">
                <img
                  src={img1}
                  alt="avatar"
                  className="w-10 h-10 object-cover object-center"
                />
              </div>
              <p className="text-black dark:text-gray-200 mt-2">friend.friend.username</p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

export default FriendList;
