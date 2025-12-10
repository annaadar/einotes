import { Modal, StyleSheet, TextInput, View } from "react-native";
import { elevatedStyle } from "@constants/styles";
import useTaskModal from "@hooks/useTaskModal";
import { Task } from "@typings/Task";
import SaveTaskButton from "../ui/buttons/SaveTaskButton"
type TaskModalProps = {
  visible: boolean;
  onClose: () => void;
  task: Task;
};
export default function TaskInfoModal({ visible, onClose, task }: TaskModalProps) {
  const [saveTask, title, setTitle, desc, setDesc] = useTaskModal(onClose, task);
  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, elevatedStyle(5)]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.title}
          ></TextInput>
          <TextInput
            value={desc}
            onChangeText={setDesc}
            style={styles.desc}
            multiline={true}
            numberOfLines={10}
          ></TextInput>
          <SaveTaskButton onPress={saveTask} />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "80%",
  },
  title: {
    fontWeight: "bold",
  },
  desc: {
    fontWeight: "400",
  },
});
