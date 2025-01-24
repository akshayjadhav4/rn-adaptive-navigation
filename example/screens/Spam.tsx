import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Spam = () => {
  return (
    <View style={styles.container}>
      <Text>Spam</Text>
    </View>
  );
};

export default Spam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
