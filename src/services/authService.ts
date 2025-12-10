import {
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "@react-native-firebase/auth";
import { GoogleSignin, SignInResponse } from "@react-native-google-signin/google-signin";

/**
 * Signs in with Google and returns a Firebase UserCredential.
 */
export async function googleSignIn(): Promise<FirebaseAuthTypes.UserCredential> {
  // Ensure Google Play Services are available
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const signInResult: SignInResponse = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;
    if (!idToken) {
      throw new Error("No ID token found");
    }
    // Create Firebase credential
    const googleCredential: FirebaseAuthTypes.AuthCredential =
      GoogleAuthProvider.credential(idToken);
    // Sign in with Firebase
    const userCredential: FirebaseAuthTypes.UserCredential = await signInWithCredential(
      getAuth(),
      googleCredential
    );
    return userCredential;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Signs out from Firebase.
 */
export async function firebaseSignOut(): Promise<void> {
  try {
    await signOut(getAuth());
  } catch (err) {
    console.error(err);
    throw err;
  }
}
