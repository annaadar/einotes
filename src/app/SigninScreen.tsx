import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import Greeting from "components/ui/Greeting";
import { routes } from "@constants/routes";
//TODO: remove signout button,  add loading state when auto-signin.
export default function SigninScreen() {
  const { fbSignIn, isLoading, isSignedIn } = useContext(AuthContext);
  const router = useRouter();
  const onSignin = async () => {
    try {
      await fbSignIn();
    }
    catch (err) {
      console.error("Error during sign-in:", err);
    }
     finally {
      console.log("sign-in flow complete");
    }
  };
  useEffect(() => {
    if (isSignedIn) {
      console.log("User is signed in");
      router.replace(routes.protected);
    }
  }, [isSignedIn]);
  return (
    <View style={styles.ScreenContainer}>
      <Greeting></Greeting>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={onSignin}
        disabled={isLoading}
        style={{ alignSelf: "center" }}
      />
      {isLoading && <ActivityIndicator></ActivityIndicator>}
    </View>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    justifyContent: "center",
    flex: 1,
    gap: "5%",
  },
});
