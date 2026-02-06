import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "./slice/userInfoSlice";

const appStore = configureStore({
  reducer: {
    userInfo: userInfoSlice,
  },
});

export default appStore;
export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
