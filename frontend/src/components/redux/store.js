import { configureStore } from '@reduxjs/toolkit';
import hamReducer from './slice/hamSlice.js';

const store = configureStore({
    reducer: {
        hamburger: hamReducer,
    },
});

export default store;