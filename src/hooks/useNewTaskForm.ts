import * as Crypto from "expo-crypto";
import { useState } from "react";
import useDatesStore from "@store/DatesStore";
import useTasksStore from "@store/TasksStore";

export default function useNewTaskForm(
  onClose: () => void
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  () => void
] {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const  addTask  = useTasksStore((state)=>state.addTask);
  const  selectedDate = useDatesStore((state)=>state.selectedDate);
  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      addTask({
        taskDate: selectedDate,
        taskDescription: description,
        taskTitle: title,
        taskId: Crypto.randomUUID(),
      });
      onClose();
    }
  };
  return [title, setTitle, description, setDescription, handleAdd];
}
