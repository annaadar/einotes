import { buttonStyles, primaryButton, secondaryButton } from "@constants/styles";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";

type SecondaryButtonProps = {
  onPress?: () => void;
  children?: string;
  style?:StyleProp<ViewStyle>
};

export default function SecondaryButton({ onPress, children, style }: SecondaryButtonProps) {
  return (
    <TouchableOpacity style={[primaryButton, style]} onPress={onPress}>
      <Text style={buttonStyles.primaryText}>{children}</Text>
    </TouchableOpacity>
  );
}
