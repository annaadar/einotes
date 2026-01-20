import React from "react";
import { Modal, StyleSheet, TextInput, View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { colors } from "@constants/colors";
import { elevatedStyle } from "@constants/styles";
import useTaskModal from "@hooks/useTaskModal";
import { Task } from "@typings/Task";
import SaveTaskButton from "../ui/buttons/SaveTaskButton";

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
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{flex: 1}}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContent}>
              <View style={[styles.modal, elevatedStyle(5)]}>
                <Text style={styles.header}>Edit Task</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Title</Text>
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.titleInput}
                    placeholder="Task title..."
                    placeholderTextColor={"#999"}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    value={desc}
                    onChangeText={setDesc}
                    style={[styles.descriptionInput, styles.textArea]}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                    placeholder="Task details..."
                    placeholderTextColor={"#999"}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <SaveTaskButton onPress={saveTask} />
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
  titleInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    color: colors.darkPink,
  },
  descriptionInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.darkPink,
  },
  textArea: {
    minHeight: 150, // Increased for Edit mode to accommodate longer notes
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 8,
  }
});