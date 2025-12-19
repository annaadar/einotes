import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { scheduleNotification } from "../utils/notifications";
import { Task } from "@typings/Task";
import {
  deleteFsTask,
  getFsTasks,
  updateFsTask,
  writeFsTask,
} from "@services/firestoreService";

interface TasksState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  taskedDates: Map<string, number>;
  deleteTask: (taskId: string, task: Task) => void;
  retrieveTasks: () => void;
}

const useTasksStore = create<TasksState>()(
  persist(
    (set) => {
      const _addDate = (date: string, task: Task) => {
        set((state: TasksState) => {
          let currentTasksCount = state.taskedDates.get(date);
          if (currentTasksCount != null) {
            return {
              taskedDates: state.taskedDates.set(
                task.taskDate.dateString,
                currentTasksCount++
              ),
            };
          }
          return { taskedDates: state.taskedDates.set(date, 1) };
        });
      };
      return {
        tasks: [],
        addTask: (task: Task) => {
          set((state) => {
            _addDate(task.taskDate.dateString, task);
            scheduleNotification(task);
            writeFsTask(task);
            return { tasks: [...state.tasks, task] };
          });
        },
        updateTask: (updatedTask: Task) => {
          set((state) => {
            const index = state.tasks.findIndex(
              (task) => task.taskId === updatedTask.taskId
            );
            if (index === -1) return state; // Task not found
            const updatedTasks = [...state.tasks];
            updatedTasks[index] = updatedTask;
            updateFsTask(updatedTask);
            return { tasks: updatedTasks };
          });
        },
        taskedDates: new Map(),
        deleteTask(taskId: string, task: Task) {
          set((state) => {
            const index = state.tasks.findIndex((task) => task.taskId == taskId);
            const splicedTasks = [...state.tasks];
            splicedTasks.splice(index, 1);
            let currentTasksCount = state.taskedDates.get(task.taskDate.dateString);
            deleteFsTask(taskId);
            if (currentTasksCount == 1) {
              state.taskedDates.delete(task.taskDate.dateString);
              return { tasks: splicedTasks };
            }

            return {
              tasks: splicedTasks,
              taskedDates: state.taskedDates.set(
                task.taskDate.dateString,
                (currentTasksCount as number)--
              ),
            };
          });
        },
        retrieveTasks: async () => {
          const snapshot = await getFsTasks();
          const tasks = snapshot.docs.map((doc) => {
            const task = doc.data() as Task;
            _addDate(task.taskDate.dateString, task); //configure metadata
            return task;
          });
          set({ tasks: tasks });
        },
      };
    },
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        taskedDates: Array.from(state.taskedDates.entries()),
      }),
      //Rehydrate back into a Map
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.taskedDates)) {
          state.taskedDates = new Map(state.taskedDates);
        }
      },
    }
  )
);

export default useTasksStore;
