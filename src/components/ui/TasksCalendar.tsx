import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { calendarTheme } from "@constants/calendarTheme";
import { colors } from "@constants/colors";
import { elevatedStyle } from "@constants/styles";
import useMarkedDates from "@hooks/useMarkedDates";
export default function TasksCalendar() {
  const [onDayPress, markedDates] = useMarkedDates();
  return (
    <Calendar
      theme={calendarTheme}
      style={[styles.calendar, elevatedStyle(3)]}
      onDayPress={onDayPress}
      markedDates={markedDates}
      markingType="multi-dot"
    ></Calendar>
  );
}
const styles = StyleSheet.create({
  calendar: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: colors.grayPink,
    margin: 10,
  },
});
