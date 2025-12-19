import { getAuth } from "@react-native-firebase/auth";
import {
  FirebaseFirestoreTypes,
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "@react-native-firebase/firestore";
import { Task } from "../typings/Task";

//TODO: ERROR HANDLING!
export async function getFsUserDoc(
  userUid: string | null
): Promise<
  [FirebaseFirestoreTypes.DocumentSnapshot, FirebaseFirestoreTypes.DocumentReference]
> {
  if (userUid) {
    const userDoc: FirebaseFirestoreTypes.DocumentReference = doc(
      getFirestore(),
      "users",
      userUid
    );
    const snapshot = await getDoc(userDoc);
    return [snapshot, userDoc] as const;
  } else {
    throw Error("userUid cannot be null after logging in.");
  }
}
/**function attempts to write the currently logged in user to firebase.
 * returns false if user already exists, or true if user was written. */
export async function writeFsUser() {
  try {
    const auth = getAuth();
    const [userSnapshot, userDoc] = await getFsUserDoc(auth.currentUser?.uid as string);
    if (userSnapshot.exists()) {
      console.log("document already exists, no need to write user.");
      return false;
      //TODO: RECOVER DATA
    } else {
      console.log("document doesn't exist, writing user.");
      setDoc(userDoc, {
        userId: auth.currentUser?.uid,
        displayName: auth.currentUser?.displayName,
      });
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}
export async function writeFsTask(task: Task) {
  const userUid = getUserUid() as string;
  const taskDoc: FirebaseFirestoreTypes.DocumentReference = doc(
    getFirestore(),
    "users",
    userUid,
    "tasks",
    task.taskId
  );
  return setDoc(taskDoc, task);
}
export async function updateFsTask(task: Task) {
  const userUid = getUserUid();
  const taskDoc = doc(getFirestore(), "users", userUid as string, "tasks", task.taskId);
  return updateDoc(taskDoc, { ...task });
}
export function getUserUid(): string | null {
  return getAuth().currentUser?.uid as string;
}
export async function deleteFsTask(taskId: string) {
  const userUid = getUserUid();
  const taskDoc = doc(getFirestore(), "users", userUid as string, "tasks", taskId);
  return deleteDoc(taskDoc);
}

export async function getFsTasks(): Promise<FirebaseFirestoreTypes.QuerySnapshot> {
  const userUid = getUserUid();
  const tasksCollection: FirebaseFirestoreTypes.CollectionReference = await collection(
    getFirestore(),
    "users",
    userUid as string,
    "tasks"
  );
  const tasksSnapshot = await getDocs(tasksCollection);
  return tasksSnapshot as FirebaseFirestoreTypes.QuerySnapshot;
}
