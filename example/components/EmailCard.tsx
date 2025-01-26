import { useNavigation } from "@react-navigation/native";
import { useAdaptiveNavigationDimensions } from "adaptive-navigation";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import type { RootStackNavigationProp } from "../navigation";
import { selectCurrentEmailId, setCurrentEmail } from "../store/mailSlice";
import { Email } from "../types";

interface EmailCardProps {
  email: Email;
}

export function EmailCard({ email }: Readonly<EmailCardProps>) {
  const navigationDimensions = useAdaptiveNavigationDimensions();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isCardActive =
    useSelector(selectCurrentEmailId) === email.id &&
    navigationDimensions?.navigationType === "NavigationRail";
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setCurrentEmail(email));
    if (navigationDimensions?.navigationType === "NavigationBar") {
      navigation.navigate("MailDetail", { email });
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.container,
          isCardActive ? { backgroundColor: "#EDE7F6" } : null,
        ]}
      >
        <Image
          source={{ uri: email.sender.avatarResourceId }}
          style={styles.avatar}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.senderName}>
              {email.sender.firstName} {email.sender.lastName}
            </Text>
            <Text style={styles.timeText}>{email.relativeTime}</Text>
          </View>
          <Text style={styles.subjectText} numberOfLines={1}>
            {email.subject}
          </Text>
          <Text style={styles.previewText} numberOfLines={2}>
            {email.content}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F8F0F9", // Primary Container color from the palette
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D192B", // On Primary Container color
  },
  timeText: {
    fontSize: 12,
    color: "#49454F", // On Surface Variant color
  },
  subjectText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1D192B", // On Primary Container color
    marginBottom: 4,
  },
  previewText: {
    fontSize: 14,
    color: "#49454F", // On Surface Variant color
    lineHeight: 20,
  },
});
