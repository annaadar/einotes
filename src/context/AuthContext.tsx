import { FirebaseAuthTypes, getAuth } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { routes } from "@constants/routes";
import { firebaseSignOut, googleSignIn } from "@services/authService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { writeFsUser } from "@services/firestoreService";
import useTasksStore from "@store/TasksStore";

type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  fbSignIn: () => Promise<FirebaseAuthTypes.UserCredential | null>;
  fbSignOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  isSignedIn: false,
  isLoading: true,
  fbSignIn: async () => {
    return null;
  },
  fbSignOut: async () => {},
});
export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const retrieveTasks = useTasksStore((state) => state.retrieveTasks);

  useEffect(() => {
    const authState = getAuth().currentUser;
    if (authState) {
      setIsSignedIn(true);
    }
    setIsLoading(false);
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    });
  }, []);

  const fbSignIn = async () => {
    setIsLoading(true);
    try {
      const userCredential = await googleSignIn();
      setIsSignedIn(true);
      router.replace(routes.protected);
      const wasWritten = await writeFsUser();
      if (!wasWritten) {
        console.log("user document already existed, retrieving data..");
        retrieveTasks();
      }
      setIsLoading(false);
      return userCredential;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const fbSignOut = async () => {
    await firebaseSignOut();
    setIsSignedIn(false);
    router.replace(routes.signInScreen);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, isLoading, fbSignIn, fbSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}
