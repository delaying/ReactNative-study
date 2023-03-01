import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { FeedListItem } from "./src/components/FeedListItem";
import { Typography } from "./src/components/Typography";
import RootApp from "./src/RootApp";
import { store } from "./src/store";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootApp />
      </Provider>
    </SafeAreaProvider>
  );
}
