import { useState } from "react";
import useTasksStore from "@store/TasksStore";
import { Task } from "../typings/Task";

export default function useTaskModal(
  onClose: () => void,
  task: Task
): [
  () => void,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const updateTask = useTasksStore((state) => state.updateTask);
  const [title, setTitle] = useState(task?.taskTitle);
  const [desc, setDesc] = useState(task?.taskDescription);
  const saveTask = () => {
    if (title?.trim()) {
      updateTask({
        ...task,
        taskTitle: title,
        taskDescription: desc,
      });
      onClose();
    }
  };
  return [saveTask, title, setTitle, desc, setDesc];
}
