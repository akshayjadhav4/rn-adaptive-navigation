export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarResourceId: string;
}

export interface Email {
  id: string;
  sender: Account;
  recipients: Account[];
  subject: string;
  content: string;
  mailbox: MailboxType;
  createdAt: string;
  relativeTime?: string;
}

export enum MailboxType {
  Inbox = "INBOX",
  Drafts = "DRAFTS",
  Sent = "SENT",
  Spam = "SPAM",
}
