// slices/locationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  route: any;
  destinationLat: null | number;
  destinationLon: null | number;
  currentAddress: {
    formattedAddress: string;
  } | null;
  error: string | null;
  paymentMethod: string;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  currentAddress: null,
  error: null,
  destinationLat: null,
  destinationLon: null,
  route: null,
  paymentMethod: "Cash",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setTheLocation: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.error = null;
    },
    setTheDestination: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number; route: any }>
    ) => {
      state.destinationLat = action.payload.latitude;
      state.destinationLon = action.payload.longitude;
      state.route = action.payload.route;
    },
    setTheAddress: (state, action: PayloadAction<{ address: string }>) => {
      state.currentAddress = { formattedAddress: action.payload.address };
    },
    setPaymentMethod: (
      state,
      action: PayloadAction<{ paymentMethod: string }>
    ) => {
      state.paymentMethod = action.payload.paymentMethod;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTheLocation,
  setTheAddress,
  setError,
  setTheDestination,
  setPaymentMethod,
} = locationSlice.actions;
export default locationSlice.reducer;
