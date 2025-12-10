import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { routes } from "@constants/routes";
import { firebaseSignOut, googleSignIn } from "@services/authService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { writeFsUser } from "@services/firestoreService";

type AuthState = {
  isSignedIn: boolean;
  fbSignIn: () => Promise<FirebaseAuthTypes.UserCredential | null>;
  fbSignOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  fbSignIn: async () => {
    return null;
  },
  fbSignOut: async () => {},
});
export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  useEffect(() => {
    const authState = getAuth().currentUser;
    if (authState) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });
  }, []);
  const fbSignIn = async () => {
    const userCredential = await googleSignIn();
    setIsSignedIn(true);
    router.replace(routes.protected);
    writeFsUser();
    return userCredential;
  };

  const fbSignOut = async () => {
    await firebaseSignOut();
    setIsSignedIn(false);
    router.replace(routes.signInScreen);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, fbSignIn, fbSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
