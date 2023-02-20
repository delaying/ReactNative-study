import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigation from "./src/navigations/RootStackNavigation";
import store from "./src/store/store";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStackNavigation />
      </Provider>
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
