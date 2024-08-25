import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [ query, setQuery ] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUserSuggestions = async (query) => {
        if (query?.length > 0) {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/users/search-users?query=${query}`,
              {withCredentials: true},
            );
            if(response.status == 200){
                console.log("daata:",response.data.data)
                setSearchResults(response.data.data);
            }
          } catch (error) {
            console.error('Error fetching search results:', error);
          }
        } else {
          setSearchResults([]); 
        }
      };

     // Debounce API calls to avoid excessive requests
     const timeoutId = setTimeout(() => {
        fetchUserSuggestions(query);
      }, 300); // Adjust the delay as needed
  
      return () => clearTimeout(timeoutId); // Clear timeout if user types quickly
  }, [query]);

  return (
    <SearchContext.Provider
      value={{
        query,
        searchResults,
        setQuery,
        setSearchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
