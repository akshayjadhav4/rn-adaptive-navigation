import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Sent = () => {
  return (
    <View style={styles.container}>
      <Text>Sent</Text>
    </View>
  );
};

export default Sent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
