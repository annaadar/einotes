import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "@constants/colors";
import { elevatedStyle } from "@constants/styles";
import { type Task } from "@typings/Task";
import DeleteButton from "./buttons/DeleteButton";
import TaskInfoModal from "../modals/TaskInfoModal";

type TaskCardProps = {
  children: React.ReactNode;
  task: Task;
  onPress?: () => void;
};
export default function TaskPreviewCard({ children, task }: TaskCardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={[styles.taskContainer, elevatedStyle(2)]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.taskText}>{children}</Text>
        <DeleteButton taskId={task.taskId} task={task}></DeleteButton>
      </TouchableOpacity>

      {modalVisible && (
        <TaskInfoModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          task={task}
        ></TaskInfoModal>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "white",
    padding: "7%",
    borderRadius: 25,
    borderColor: colors.lightPink,
    borderWidth: 4,
    margin: 6,
    marginHorizontal:13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: { fontWeight: "500", color: colors.grayPink },
});
