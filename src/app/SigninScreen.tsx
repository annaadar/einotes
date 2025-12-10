import { ActivityIndicator, Button } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SigninScreen() {
  const { fbSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button
        title="sign in using google"
        onPress={async () => {
          try {
            setLoading(true);
            await fbSignIn();
          } finally {
            setLoading(false);
          }
        }}
        disabled={loading}
      ></Button>
      {loading && <ActivityIndicator></ActivityIndicator>}
    </>
  );
}
