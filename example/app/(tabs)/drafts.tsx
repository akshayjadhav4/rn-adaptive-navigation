import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Drafts = () => {
  return (
    <View style={styles.container}>
      <Text>Drafts</Text>
    </View>
  );
};

export default Drafts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
