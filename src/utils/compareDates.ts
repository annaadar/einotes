import { DateData } from "react-native-calendars";
import { Task } from "@typings/Task";
export const compareDates = (task: Task, date: DateData) => {
  return (
    task.taskDate.day === date.day &&
    task.taskDate.month == date.month &&
    task.taskDate.year == date.year
  );
};
