import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageDetailScreen from "../screen/ImageDetailScreen";
import BottomTabNavigations from "./BottomTabNavigations";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bottomTab" component={BottomTabNavigations} />
      <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
};
