import React from "react";
import {
  Modal,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
  const [title, setTitle, description, setDescription, handleAdd] =
    useNewTaskForm(onClose);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContent}>
              <View style={[styles.modal, elevatedStyle(4)]}>
                <Text style={styles.header}>New Task</Text>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Title</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="What needs to be done?"
                    placeholderTextColor={"#999"}
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Add more details..."
                    placeholderTextColor={"#999"}
                    value={description}
                    multiline={true}
                    textAlignVertical="top"
                    onChangeText={setDescription}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TaskFormButtons handleAdd={handleAdd} onClose={onClose} />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    // We removed centering from here to stop the "lift"
  },
  innerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 24,
    width: "85%",
    maxWidth: 400,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: colors.grayPink,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.grayPink || "#888",
    textTransform: "uppercase",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
