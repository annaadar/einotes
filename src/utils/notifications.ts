import * as Notifications from "expo-notifications";
import { Task } from "@typings/Task";

export const scheduleNotification = (task: Task) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  let { year, month, day } = task.taskDate;
  month = month - 1;
  let hour = 10;
  let minute = 0;
  const triggerDate = new Date(year, month, day, hour, minute);
  console.log(triggerDate);
  Notifications.scheduleNotificationAsync({
    content: {
      title: task.taskTitle,
      body: task.taskDescription,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: triggerDate,
    },
  });
};
