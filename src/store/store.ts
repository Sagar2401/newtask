
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import contactSlice from "./contactSlice";

export const store = configureStore({
  reducer: {
    contact: contactSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
