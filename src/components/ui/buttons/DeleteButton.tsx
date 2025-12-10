import { FontAwesome } from "@expo/vector-icons";
import useTasksStore from "@store/TasksStore";
import { Task } from "@typings/Task";

export default function DeleteButton({ taskId, task }: { taskId: string; task: Task }) {
  const deleteTask = useTasksStore((state)=>state.deleteTask);
  return (
    <FontAwesome.Button
      name="trash"
      color={"#8f5d64ff"}
      backgroundColor="#ffffffff"
      onPress={() => deleteTask(taskId, task)}
    ></FontAwesome.Button>
  );
}
