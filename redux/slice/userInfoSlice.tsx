import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  initialState: {
    user: null,
  },
  name: "userInfo",
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default userInfoSlice.reducer;
export const { setUser } = userInfoSlice.actions;
