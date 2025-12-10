import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateData } from "react-native-calendars";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface DatesStore {
  selectedDate: DateData;
  setSelectedDate: (date: DateData) => void;
}
const useDatesStore = create<DatesStore>()(
  persist(
    (set) => ({
      selectedDate: {
        dateString: "",
        day: new Date().getUTCDate(),
        month: new Date().getUTCMonth() + 1,
        year: new Date().getFullYear(),
        timestamp: 1,
      },
      setSelectedDate(date) {
        set(() => ({
          selectedDate: date,
        }));
      },
    }),
    {
      name: "dates-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useDatesStore;
