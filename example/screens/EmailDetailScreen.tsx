import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Email } from "../types";

interface EmailDetailScreenProps {
  route: {
    params: {
      email: Email;
    };
  };
  isSplitView?: boolean;
}

const EmailDetailScreen: React.FC<EmailDetailScreenProps> = ({
  route,
  isSplitView = false,
}) => {
  const { email } = route.params;

  return (
    <View style={[styles.container, isSplitView ? { padding: 0 } : null]}>
      {!isSplitView ? (
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1D192B" />
          </TouchableOpacity>
          <Text style={styles.subject}>{email.subject}</Text>
        </View>
      ) : null}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: email.sender.avatarResourceId }}
            style={styles.avatar}
          />
          <View style={styles.headerRow}>
            <Text style={styles.senderName}>
              {email.sender.firstName} {email.sender.lastName}
            </Text>
            <Text style={styles.timeText}>{email.relativeTime}</Text>
          </View>
        </View>
        <Text style={styles.content}>{email.content}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.replyButton]}>
            <Text style={styles.buttonText}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.replyAllButton]}>
            <Text style={styles.buttonText}>Reply All</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFBFE",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 32,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    padding: 12,
    backgroundColor: "#ece6ee",
    borderRadius: 50,
    position: "absolute",
    left: 0,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerRow: {},
  senderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D192B", // On Primary Container color
  },
  timeText: {
    fontSize: 12,
    color: "#49454F", // On Surface Variant color
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#ece6ee",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D192B",
  },
  time: {
    fontSize: 12,
    color: "#6750A4",
    marginBottom: 16,
    textAlign: "right",
  },
  separator: {
    height: 1,
    backgroundColor: "#E7E0EC",
    marginVertical: 12,
  },
  content: {
    fontSize: 14,
    color: "#1D192B",
    lineHeight: 20,
  },
  buttonContainer: {
    marginVertical: 60,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: "center",
    marginHorizontal: 4,
  },
  replyButton: {
    backgroundColor: "#E8DEF8",
  },
  replyAllButton: {
    backgroundColor: "#E8DEF8",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6750A4",
  },
});

export default EmailDetailScreen;
