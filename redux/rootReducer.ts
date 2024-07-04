// route
import routeReducer from "./features/route/routeSlice";
// user
import userReducer from "./features/user/userSlice";
import scoreReducer from "./features/user/scoreSlice";
// onboarding
import onBoardingReducer from "./features/user/onBoardingSlice";
// assesment
import assesmentReducer from "./features/user/assesmentSlice";
// test
import testReducer from "./features/test/sat-full-length/testSlice";
import testProblemsReducer from "./features/test/sat-full-length/testProblemSlice";
// dashboard
import dashBoardReducer from "./features/dashboard/dashboardSlice";
// assistant
import assistantReducer from "./features/assistant/assistantSlice";
// test
import testConfigReducer from "./features/test/testConfigSlice";
import practiceRedicer from "./features/test/practice/practiceSlice";
// export
import { combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  routeReducer,
  userReducer,
  scoreReducer,
  onBoardingReducer,
  assesmentReducer,
  testReducer,
  testProblemsReducer,
  dashBoardReducer,
  assistantReducer,
  testConfigReducer,
  practiceRedicer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === "user/logout") {
    // reset all state
    state = undefined;
  }
  return appReducer(state, action);
};
