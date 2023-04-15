import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  LI_page: 0,
  User_page: 0,
  CO_page: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserPage: (state, action) => {
      state.User_page = action.payload.User_page;
    },

    setLiPage: (state, action) => {
      state.LI_page = action.payload.LI_page;
    },
    setCOPage: (state, action) => {
      state.CO_page = action.payload.CO_page;
    },
  },
});

export const { setUserPage, setLiPage, setCOPage } = authSlice.actions;
export default authSlice.reducer;
