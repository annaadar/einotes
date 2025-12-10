import React from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { colors } from "@constants/colors";
import { elevatedStyle } from "@constants/styles";
import useNewTaskForm from "@hooks/useNewTaskForm";
import TaskFormButtons from "../ui/buttons/TaskFormButtons";

export default function NewTaskModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [title, setTitle, description, setDescription, handleAdd] = useNewTaskForm(onClose);
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={[styles.modal, elevatedStyle(4)]}>
          <TextInput
            style={styles.input}
            placeholder="Task Title..."
            placeholderTextColor={"#411e1eff"}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Task Description..."
            placeholderTextColor={"#411e1eff"}
            value={description}
            multiline={true}
            numberOfLines={5}
            onChangeText={setDescription}
          />
          <TaskFormButtons handleAdd={handleAdd} onClose={onClose}></TaskFormButtons>
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
  input: {
    borderBottomWidth: 1,
    borderColor: colors.grayPink,
    marginBottom: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
