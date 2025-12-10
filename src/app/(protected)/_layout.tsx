import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedLayout() {
  const { isSignedIn } = useContext(AuthContext);
  if (!isSignedIn) {
    return <Redirect href={"/SigninScreen"}></Redirect>;
  }
  return <Stack screenOptions={{ animation: "fade", headerShown: false }}></Stack>;
}
