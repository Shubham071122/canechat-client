import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { NavLink } from 'react-router-dom';

function SearchSuggestions() {
  const { searchResults } = useSearch();

  return (
    <>
      {searchResults.map((user) => (
        <NavLink
          to=""
          key={user._id}
          className={({ isActive }) =>
            `rounded-md ${
              isActive ? 'shadow-md dark:shadow-gray-900' : 'shadow-sm'
            }`
          }
        >
          <div className="px-4 py-3 w-full flex flex-row items-center justify-start gap-6 border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-slate-700">
            <div className="border-[3px] rounded-full w-12 h-12 border-gray-400 dark:border-gray-200 flex items-center justify-center">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 object-cover object-cente rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-base text-black dark:text-gray-200">
                {user.fullName}
              </p>
              <p className="font-semibold text-sm text-gray-500 dark:text-gray-400">
                {user.userName}
              </p>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default SearchSuggestions;
