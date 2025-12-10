import { FlatList, ListRenderItemInfo } from "react-native";
import useFilteredTasks from "@hooks/useFilteredTasks";
import TasksFooter from "../tasks-footer/TasksFooter";
import { Task } from "@typings/Task";
import TaskPreviewCard from "./TaskPreviewCard";

export default function TasksList() {
  const filteredTasks = useFilteredTasks();
  const renderTaskCard = (item: ListRenderItemInfo<Task>) => {
    return <TaskPreviewCard task={item.item}>{item.item.taskTitle}</TaskPreviewCard>;
  };
  return (
    <FlatList
      style={{ flex: 3 }}
      data={filteredTasks}
      renderItem={renderTaskCard}
      ListFooterComponent={TasksFooter}
    ></FlatList>
  );
}
