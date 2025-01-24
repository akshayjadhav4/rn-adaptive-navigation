import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Inbox = () => {
  return (
    <View style={styles.container}>
      <Text>Inbox</Text>
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
});
