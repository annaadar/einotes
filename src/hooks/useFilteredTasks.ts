import useDatesStore from "@store/DatesStore";
import useTasksStore from "@store/TasksStore";
import { useState, useEffect } from "react";
import { Task } from "@typings/Task";
import { compareDates } from "utils/compareDates";

export default function useFilteredTasks() {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>();
  const selectedDate = useDatesStore((state) => state.selectedDate);
  const allTasks = useTasksStore((state) => state.tasks);
  useEffect(() => {
    const tasks = allTasks.filter((task) => compareDates(task, selectedDate));
    setFilteredTasks(tasks);
  }, [selectedDate, allTasks]);
  return filteredTasks;
}
