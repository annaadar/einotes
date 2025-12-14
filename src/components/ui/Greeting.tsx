import useSigninAnimation from "@hooks/useSigninAnimation";
import { Animated, StyleSheet, Text } from "react-native";

export default function Greeting() {
  const slideAnimation = useSigninAnimation();
  return (
    <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
      <Text style={styles.text}>Sign-in using Google to start using Einotes!</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 38,
    marginHorizontal: 20,
    color: "#611515ff",
    textShadowColor: "#dcc2baff",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 0.3,
  },
});
