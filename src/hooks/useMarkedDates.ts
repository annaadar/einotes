import { useMemo } from "react";
import { DateData } from "react-native-calendars";
import { colors } from "../constants/colors";
import useDatesStore from "@store/DatesStore";
import useTasksStore from "@store/TasksStore";
import { useShallow } from "zustand/react/shallow";
import { MarkedDates } from "react-native-calendars/src/types";

export default function useMarkedDates(): [(day: DateData) => void, MarkedDates] {
  const { setSelectedDate, selectedDate } = useDatesStore();
  const { taskedDates, tasks } = useTasksStore(
    useShallow((state) => ({
      taskedDates: state.taskedDates,
      tasks: state.tasks,
    }))
  );

  const onDayPress = (day: DateData) => setSelectedDate(day);

  const markedDates = useMemo<MarkedDates>(() => {
    const result: MarkedDates = {};

    taskedDates.forEach((_, date) => {
      result[date] = {
        dots: [{ key: "dot", color: colors.darkPink }],
      };
    });

    if (selectedDate) {
      result[selectedDate.dateString] = {
        ...(result[selectedDate.dateString] || {}),
        selected: true,
        selectedColor: colors.grayPink,
      };
    }

    return result;
  }, [taskedDates, tasks, selectedDate]);

  return [onDayPress, markedDates];
}