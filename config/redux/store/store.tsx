// store.ts
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../reducers/locationSlice"; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
