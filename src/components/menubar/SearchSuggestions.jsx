import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function SearchSuggestions() {
  const { searchResults } = useSearch();

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaUser className="text-2xl text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No users found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
          Try searching with a different term
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 py-2">
        Search Results ({searchResults.length})
      </div>
      
      {searchResults.map((user) => (
        <NavLink
          to={`/user/f/${user._id}`}
          key={user._id}
          className={({ isActive }) =>
            `block rounded-xl transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
              isActive 
                ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/20' 
                : ''
            }`
          }
        >
          <div className="p-3 flex items-center space-x-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 border-2 border-white dark:border-gray-600 shadow-sm">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.fullName}'s avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <FaUser className="text-lg" />
                </div>
              </div>
              
              {/* Online indicator */}
              {/* <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div> */}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user.fullName}
                </h3>
                {user.isVerified && (
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user.userName}
              </p>
            </div>

            {/* Action indicator */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-gray-500 dark:text-gray-400 text-xs">→</span>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
      
      {/* Footer */}
      {searchResults.length > 0 && (
        <div className="px-3 py-2 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Click on a user to start chatting
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchSuggestions;
