import { DateData } from "react-native-calendars";
export interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskDate: DateData;
}
