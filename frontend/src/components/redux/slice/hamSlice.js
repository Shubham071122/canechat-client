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
    },
});

export const { toggleHam } = hamSlice.actions;
export default hamSlice.reducer;
