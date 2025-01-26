import { faker } from "@faker-js/faker";

import { Account, Email, MailboxType } from "../types";

// Generate a random account
const createAccount = (): Account => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  avatarResourceId: faker.image.avatar(),
});

// Create some fixed accounts to use as sender and recipients
export const dummyAccounts: Account[] = Array(5)
  .fill(null)
  .map(() => createAccount());

// Current user account
export const currentUserAccount: Account = {
  id: faker.string.uuid(),
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  avatarResourceId: faker.image.avatar(),
};

// Generate a random email
const createEmail = (mailbox: MailboxType): Email => {
  const isOutgoing =
    mailbox === MailboxType.Sent || mailbox === MailboxType.Drafts;
  const sender = isOutgoing
    ? currentUserAccount
    : faker.helpers.arrayElement(dummyAccounts);
  const recipients = isOutgoing
    ? [faker.helpers.arrayElement(dummyAccounts)]
    : [currentUserAccount];

  const createdAt = faker.date.recent({ days: 14 }).toISOString();

  return {
    id: faker.string.uuid(),
    sender,
    recipients,
    subject: faker.helpers.arrayElement([
      faker.lorem.sentence(),
      "Meeting Tomorrow",
      "Project Update",
      "Important Announcement",
      "Weekly Newsletter",
      "Your Account Statement",
      "Invitation to Event",
    ]),
    content: faker.lorem.paragraphs(3),
    mailbox,
    createdAt,
    relativeTime: "2 hours ago", // This should be computed dynamically in the UI
  };
};

// Generate dummy emails for each mailbox
const generateEmailsForMailbox = (
  mailbox: MailboxType,
  count: number
): Email[] =>
  Array(count)
    .fill(null)
    .map(() => createEmail(mailbox));

// Generate initial emails data
export const dummyEmails: Email[] = [
  ...generateEmailsForMailbox(MailboxType.Inbox, 10),
  ...generateEmailsForMailbox(MailboxType.Sent, 8),
  ...generateEmailsForMailbox(MailboxType.Drafts, 3),
  ...generateEmailsForMailbox(MailboxType.Spam, 5),
];
