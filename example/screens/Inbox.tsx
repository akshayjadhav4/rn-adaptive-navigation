import { useAdaptiveNavigationDimensions } from "adaptive-navigation";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Inbox = () => {
  const navigationDimensions = useAdaptiveNavigationDimensions();

  return (
    <View style={[styles.container, { width: navigationDimensions?.width }]}>
      <Text style={{ fontSize: 40 }}>Inbox</Text>
      <Text>Width: {navigationDimensions?.width}</Text>
      <Text>Height: {navigationDimensions?.height}</Text>
      <Text>NavigationType: {navigationDimensions?.navigationType}</Text>
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
