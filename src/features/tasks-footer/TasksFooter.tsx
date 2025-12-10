import { useState } from "react";
import NewTaskModal from "../new-tasks-form/NewTaskModal";
import AddTaskCard from "./AddTaskCard";

export default function TasksFooter() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <AddTaskCard onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <NewTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      )}
    </>
  );
}
