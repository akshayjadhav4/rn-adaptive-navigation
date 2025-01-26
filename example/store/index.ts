import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import accountReducer from "./accountSlice";
import mailReducer from "./mailSlice";
import { currentUserAccount } from "../utils/dummyData";

const rootReducer = combineReducers({
  mail: mailReducer,
  account: accountReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    account: {
      currentAccount: currentUserAccount,
      loading: false,
      error: null,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
