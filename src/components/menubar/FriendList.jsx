import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import getTimeStamp from '../time&date/getTimeStamp';
import { useUser } from '../../context/UserContext';
import { useSearch } from '../../context/SearchContext';
import SearchSuggestions from './SearchSuggestions';
import { fetchMessages } from '../redux/slice/messageSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [lastMsgTime, setLastMsgTime] = useState('');
  const { getUserDataById } = useUser();
  const { searchResults } = useSearch();
  const dispatch = useDispatch();
  const {currentUserId} = useAuth();

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
          const sortedFriends = response.data.data.sort((a, b) => {
            return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
          });
          setFriends(sortedFriends);
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

  const handleClick = async (recipientId) => {
    if (recipientId ) {
      await getUserDataById(recipientId);
      dispatch(fetchMessages({ userId: currentUserId, recipientId: recipientId }))
    }
    console.log("click")
  };

  // console.log('friends:', friends);

  if (searchResults.length > 0) {
    return (
      <section className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-3">
          <SearchSuggestions />
        </div>
      </section>
    );
  }

  return (
    <section className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Chats
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {friends.length} conversation{friends.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Friends List */}
      <div className="overflow-y-auto h-full pb-20">
        {friends.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No conversations yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start a conversation by adding friends</p>
          </div>
        ) : (
          friends.map((friend, index) => (
            <NavLink
              key={friend.friendId}
              to={`/user/chat/${friend.friendId}`}
              onClick={() => handleClick(friend.friendId)}
              className={({ isActive }) =>
                `block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                  isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                }`
              }
            >
              <div className="px-4 py-3 flex items-center space-x-3 relative">
                {/* Avatar with online status */}
                <div className="relative flex-shrink-0">
                  <img
                    src={friend.avatar}
                    alt={friend.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {/* Online indicator - you can add logic to show actual online status */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {friend.fullName}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {friend.lastMessageTime && getTimeStamp(friend.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">
                      {friend.lastMessage && friend.lastMessage.length > 30
                        ? friend.lastMessage.slice(0, 30) + '...'
                        : friend.lastMessage || 'No messages yet'}
                    </p>
                    
                    {/* Unread indicator - you can add logic for unread count */}
                    {/* <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div> */}
                  </div>
                </div>
              </div>
            </NavLink>
          ))
        )}
      </div>
    </section>
  );
}

export default FriendList;
