import { StyleSheet } from "react-native";

export const color = {
  primary: "#40534C",
  secondary: "#677D6A",
  light: "#E4E4E4",
  dark: "#333",
  white: "#fff",
  black: "#000",
  gray: "#C0C0C0",
  blue: "#0076A9",
  red: "#C85454",
};

export const auth = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#677D6A",
  },
  section: {
    backgroundColor: "#E4E4E4",
    paddingBottom: 200,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  textError: {
    color: "red",
    marginVertical: -8,
  },
});

export const tabScreen = StyleSheet.create({
  profileSection: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.light,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
});

export const tabUndangan = StyleSheet.create({
  container: {
    padding: 0,
  },
  row: {
    flexDirection: "row",
  },
  label: {
    flex: 2,
    fontSize: 14,
  },
  separator: {
    flex: 0.3,
    fontSize: 14,
  },
  value: {
    flex: 4,
    fontSize: 14,
  },
});

export const global = StyleSheet.create({
  background: {
    backgroundColor: color.secondary,
  },
  container: {
    padding: 24,
    gap: 20,
  },
  text: {
    color: color.primary,
  },
  textSecondary: {
    color: color.light,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: color.secondary,
  },
  navButtonContainer: {
    gap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 16,
    backgroundColor: color.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: color.white,
  },
});
