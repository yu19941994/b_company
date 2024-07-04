import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RouteState = {
  pathname: string;
  searchParams: { [key: string]: string };
  prevUrl: string;
};

const initialState = {
  pathname: "",
  searchParams: {},
  prevUrl: "",
} as RouteState;

export const testConfigSlice = createSlice({
  name: "test-config",
  initialState,
  reducers: {
    setPathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    setSearchParams: (
      state,
      action: PayloadAction<{ [key: string]: string }>,
    ) => {
      state.searchParams = action.payload;
    },
    setPrevUrl: (state, action: PayloadAction<string>) => {
      state.prevUrl = action.payload;
    },
  },
});

export const { setPathname, setSearchParams, setPrevUrl } =
  testConfigSlice.actions;
export default testConfigSlice.reducer;
