import { View, StyleSheet, ScrollView } from "react-native";
import TasksList from "components/layout/TasksList";
import TasksCalendar from "components/ui/TasksCalendar";
export default function index() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calendarWrapper}>
          <TasksCalendar />
        </View>

        <View style={styles.listWrapper}>
          <TasksList />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    gap: 20,
  },
  calendarWrapper: {
    height: 430,
    width: "100%",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#efe7e7ff",
  },
  listWrapper: {
    flex: 1,
  },
});
