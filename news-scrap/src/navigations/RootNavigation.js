import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsDetailScreen from "../screens/NewsDetailScreen";
import NewsTabNavigation from "./NewsTabNavigation";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewsTab" component={NewsTabNavigation}></Stack.Screen>
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
