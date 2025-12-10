import { Platform, StyleSheet } from "react-native";

export const elevatedStyle = (elevation: number) => {
  return {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        backgroundColor: "white",
      },
      android: {
        elevation: elevation,
      },
    }),
  };
};

export const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#a9767aff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  primaryText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center",
  },
  secondaryButton: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  secondaryText: {
    color: "#555",
    fontSize: 18,
    fontWeight: "500",
  },
});
export const primaryButton = [elevatedStyle(3), buttonStyles.primaryButton];
export const secondaryButton = [elevatedStyle(2), buttonStyles.secondaryButton];
