import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const hamSlice = createSlice({
    name: 'hamburger',
    initialState,
    reducers: {
        toggleHam: (state) => {
            state.isOpen = !state.isOpen;
        },
        closeHam: (state) => {
            state.isOpen = false;
        }
    },
});

export const { toggleHam, closeHam } = hamSlice.actions;
export default hamSlice.reducer;
