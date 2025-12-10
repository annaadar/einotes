import { useRef, useEffect } from "react";
import { Animated } from "react-native";

export default function useSigninAnimation() {
  const slideAnim = useRef(new Animated.Value(-250)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);
  return slideAnim;
}
