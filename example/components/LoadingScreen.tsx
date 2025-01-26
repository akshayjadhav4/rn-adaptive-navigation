import { ActivityIndicator, Text, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFBFE",
      }}
    >
      <ActivityIndicator size="large" color="#6750A4" />
      <Text style={{ marginTop: 12, color: "#1D192B" }}>Loading...</Text>
    </View>
  );
}
