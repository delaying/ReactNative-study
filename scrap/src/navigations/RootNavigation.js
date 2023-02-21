import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddLinkScreen from "../screens/AddLinkScreen";
import LinkStackNavigation from "./LinkStackNavigation";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="LinkStack"
      screenOptions={{
        presentation: "containedModal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="LinkStack" component={LinkStackNavigation} />
      <Stack.Screen name="AddLink" component={AddLinkScreen} />
    </Stack.Navigator>
  );
};
