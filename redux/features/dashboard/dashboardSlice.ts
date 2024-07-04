import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavbarTabs } from "@/types/dashboard";

type DashboardState = {
  navbarTab: string;
  // dashboardTabs: (typeof dashboardTabs)[number];
  math: {};
  reading: {};
  writing: {};
  vocabulary: {};
  status: {
    predictionScore: number;
    totalStudyTime: number;
    SATCountDown: number;
    achievement: any[];
  };
};
const initialState: DashboardState = {
  navbarTab: "dashboard",
  // dashboardTabs: dashboardTabs[0],
  math: {},
  reading: {},
  writing: {},
  vocabulary: {},
  status: {
    predictionScore: 0,
    totalStudyTime: 0,
    SATCountDown: 0,
    achievement: [],
  },
};

export const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setNavbarTab: (state, action: PayloadAction<string>) => {
      state.navbarTab = action.payload;
    },
  },
});

export const { setNavbarTab } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
