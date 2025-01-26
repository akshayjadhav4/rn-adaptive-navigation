import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Account } from "../types";
import { currentUserAccount } from "../utils/dummyData";

interface AccountState {
  currentAccount: Account | null;
  loading: boolean;
  error: string | null;
}

// Initialize with dummy current user account
const initialState: AccountState = {
  currentAccount: currentUserAccount, // Initialize with our dummy account
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload;
    },
    updateAccount: (state, action: PayloadAction<Partial<Account>>) => {
      if (state.currentAccount) {
        state.currentAccount = { ...state.currentAccount, ...action.payload };
      }
    },
    clearAccount: (state) => {
      state.currentAccount = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentAccount,
  updateAccount,
  clearAccount,
  setLoading,
  setError,
} = accountSlice.actions;

export default accountSlice.reducer;
