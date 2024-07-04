import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userState = {
  userProfile: UserProfile;
  auth: {
    accessToken: string | null;
    status: {
      loading: boolean;
      userInfo: any;
      userToken: any;
      error: any;
      success: boolean;
    };
  };
};

type UserProfile = {
  isTeacher: boolean;
  isTesting: boolean;
  id: number;
  user_name: string;
  grade: number;
  country: string;
  user: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  date_joined: string;
};

//     "user": {
//         "pk": 8,
//         "username": "chi_hsueh",
//         "email": "hungchihsueh@gmail.com",
//         "first_name": "Chi Hsueh",
//         "last_name": "Hung"
//     }

const initialState = {
  userProfile: {
    isTeacher: false,
    isTesting: false,
    id: -1,
    user_name: "",
    grade: -1,
    country: "",
    user: -1,
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    date_joined: "",
  },
  auth: {
    accessToken: null,
    status: {
      loading: false,
      userInfo: null,
      userToken: null,
      error: null,
      success: false,
    },
  },
} as userState;

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setisTesting: (state, action: PayloadAction<boolean>) => {
      state.userProfile.isTesting = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.auth.accessToken = action.payload;
    },
    setUserProfile: (
      state,
      action: PayloadAction<Partial<UserProfile> | null>,
    ) => {
      state.userProfile = {
        ...state.userProfile,
        ...action.payload,
      } as UserProfile;
    },
    setIsTeacher: (state, action: PayloadAction<boolean>) => {
      state.userProfile.isTeacher = action.payload;
    },
    logout: (state) => (state = initialState),
  },
});

export const {
  setisTesting,
  setAccessToken,
  setUserProfile,
  setIsTeacher,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
