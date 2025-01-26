import { useAdaptiveNavigationDimensions } from "adaptive-navigation";
import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { EmailCard } from "../components/EmailCard";
import { useAppSelector } from "../hooks/useStore";
import type { RootState } from "../store";
import { Email, MailboxType } from "../types";
import EmailDetailScreen from "./EmailDetailScreen";
import { setCurrentEmail } from "../store/mailSlice";

interface MailScreenProps {
  mailboxType: MailboxType;
}

const MailScreen: React.FC<MailScreenProps> = ({ mailboxType }) => {
  const navigationDimensions = useAdaptiveNavigationDimensions();
  const dispatch = useDispatch();
  const emails = useAppSelector((state: RootState) =>
    state.mail.emails.filter((email) => email.mailbox === mailboxType)
  );

  useEffect(() => {
    dispatch(setCurrentEmail(emails[0]));
  }, []);
  if (navigationDimensions?.navigationType === "NavigationRail") {
    return (
      <View style={styles.splitViewContainer}>
        <View style={[{ flex: 1 }]}>
          <EmailList emails={emails} />
        </View>
        <View style={[{ flex: 1 }]}>
          <EmailDetailScreen isSplitView />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={emails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EmailCard email={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};
const EmailList: React.FC<{ emails: Email[] }> = ({ emails }) => {
  return (
    <FlatList
      data={emails}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <EmailCard email={item} />}
      contentContainerStyle={styles.listContent}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBFE", // Background color from palette
  },
  splitViewContainer: {
    flex: 1,
    flexDirection: "row",
  },
  listContent: {
    paddingVertical: 8,
  },
});

export default MailScreen;
