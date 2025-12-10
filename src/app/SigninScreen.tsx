import { ActivityIndicator, Animated, Text, View } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import useSigninAnimation from "@hooks/useSigninAnimation";
//TODO: remove signout button,  add loading state when auto-signin.
export default function SigninScreen() {
  const { fbSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const slideAnimation = useSigninAnimation()
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: "5%" }}>
      <Animated.View style={{ transform: [{ translateY: slideAnimation }] }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 38,
            marginHorizontal:20,
            color: "#611515ff",
            textShadowColor: "#dcc2baff",
            textShadowOffset: { width: 0, height: 3 },
            textShadowRadius: 0.3
          }}
        >
          Signin using Google to start using Einotes!
        </Text>
      </Animated.View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={async () => {
          try {
            setLoading(true);
            await fbSignIn();
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      />
      {loading && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
}
