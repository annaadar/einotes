import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import Greeting from "components/ui/Greeting";
//TODO: remove signout button,  add loading state when auto-signin.
export default function SigninScreen() {
  const { fbSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const onSignin = async () => {
    try {
      setLoading(true);
      await fbSignIn();
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.ScreenContainer}>
      <Greeting></Greeting>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={onSignin}
        disabled={loading}
      />
      {loading && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: "5%",
  },
});
