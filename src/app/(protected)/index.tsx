import { View, StyleSheet, Button } from "react-native";
import TasksList from "../../features/tasks/TasksList";
import TasksCalendar from "../../TasksCalendar";
import { getAuth, signOut } from "@react-native-firebase/auth";
export default function index() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1.25 }}>
        <TasksCalendar />
        {/* <Button title='signout' onPress={()=>signOut(getAuth())}></Button> */}
      </View>
      <TasksList />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "column", flex: 1, gap: 50, backgroundColor: "#efe7e7ff" },
});
