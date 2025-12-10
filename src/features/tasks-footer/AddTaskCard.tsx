import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "@constants/colors";
import { elevatedStyle } from "@constants/styles";

export default function AddTaskCard({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={[elevatedStyle(2), styles.card]} onPress={onPress}>
      <Text style={styles.text}>＋ Add New Task</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8e9ec",
    borderRadius: 20,
    borderColor: colors.lightPink,
    borderWidth: 3,
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.grayPink,
  },
});
