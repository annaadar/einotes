import useSigninAnimation from "@hooks/useSigninAnimation";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Greeting() {
  const slideAnimation = useSigninAnimation();
  return (
    <Animated.View
      style={{ transform: [{ translateY: slideAnimation }], ...styles.container }}
    >
      <Text style={styles.title}>Einotes</Text>
      <View style={styles.divider} />
      <Text style={styles.text}>Sign-in using Google to start using Einotes!</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 34,
    marginHorizontal: '2%',
    color: "#611515ff",
    textShadowColor: "#dcc2baff",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 1,
    lineHeight: 42,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#611515ff",
    textTransform: "uppercase",
    letterSpacing: 4,
    marginBottom: 10,
    opacity: 0.8,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: "#dcc2baff",
    borderRadius: 2,
    marginBottom: 25,
  },
});
