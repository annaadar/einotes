import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(protected)"></Stack.Screen>
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#efe7e7ff" },
});
