import useDatesStore from "@store/DatesStore";
import useTasksStore from "@store/TasksStore";
import { useMemo } from "react";
import { compareDates } from "utils/compareDates";

export default function useFilteredTasks() {
  const selectedDate = useDatesStore((state) => state.selectedDate);
  const allTasks = useTasksStore((state) => state.tasks);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => compareDates(task, selectedDate));
  }, [selectedDate, allTasks]);

  return filteredTasks;
}
