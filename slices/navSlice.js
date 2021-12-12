import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    origin: null,
    destination: null,
    travelTimeInformation: null,
    bookmart1: "Set BookMarks from Bookmark Tab",
    bookmart2: "Set BookMarks from Bookmark Tab",
}


export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setbookmart1: (state, action) => {
            state.bookmart1 = action.payload;
        },
        setbookmart2: (state, action) => {
            state.bookmart2 = action.payload;
        },
    },
});

export const { setOrigin, setDestination, setTravelTimeInformation } = 
    navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin
export const selectDestination = (state) => state.nav.destination
export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation
export const selectbookmart1 = (state) => state.nav.bookmart1
export const selectbookmart2 = (state) => state.nav.bookmart2

export default navSlice.reducer