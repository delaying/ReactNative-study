import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Typography from "./src/components/Typography";
import BottomTabNavigations from "./src/navigations/BottomTabNavigations";
import RootStackNavigation from "./src/navigations/RootStackNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
