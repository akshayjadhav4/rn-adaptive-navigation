import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Email, MailboxType } from "../types";
import { dummyEmails } from "../utils/dummyData";

interface MailState {
  emails: Email[];
  currentEmail: Email | null;
  loading: boolean;
  error: string | null;
}

const initialState: MailState = {
  emails: dummyEmails,
  currentEmail: null,
  loading: false,
  error: null,
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    setEmails: (state, action: PayloadAction<Email[]>) => {
      state.emails = action.payload;
    },
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.push(action.payload);
    },
    deleteEmail: (state, action: PayloadAction<string>) => {
      state.emails = state.emails.filter(
        (email) => email.id !== action.payload
      );
    },
    moveToMailbox: (
      state,
      action: PayloadAction<{ emailId: string; mailbox: MailboxType }>
    ) => {
      const email = state.emails.find((e) => e.id === action.payload.emailId);
      if (email) {
        email.mailbox = action.payload.mailbox;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentEmail: (state, action: PayloadAction<Email | null>) => {
      state.currentEmail = action.payload;
    },
  },
});

export const {
  setEmails,
  addEmail,
  deleteEmail,
  moveToMailbox,
  setLoading,
  setError,
  setCurrentEmail,
} = mailSlice.actions;

export default mailSlice.reducer;
