import { configureStore } from '@reduxjs/toolkit';
import hamReducer from './slice/hamSlice.js';
import messagesReducer from './slice/messageSlice.js'

const store = configureStore({
    reducer: {
        hamburger: hamReducer,
        messages: messagesReducer,
    },
});

export default store;