import React from "react";
import { StyleSheet, View } from "react-native";
import SecondaryButton from "components/shared/SecondaryButton";
import PrimaryButton from "components/shared/PrimaryButton";

type TaskButtonsProps = {
  handleAdd: () => void;
  onClose: () => void;
};

export const TaskFormButtons = ({ handleAdd, onClose }: TaskButtonsProps) => {
  return (
    <View style={styles.buttonContainer}>
      <PrimaryButton onPress={handleAdd}>Add Task</PrimaryButton>
      <SecondaryButton onPress={onClose}>Cancel</SecondaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "10%",
  },
});

export default TaskFormButtons;
