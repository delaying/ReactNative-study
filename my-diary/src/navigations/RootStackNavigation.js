import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDiaryScreen from "../screens/AddDiaryScreen";
import DiaryStackNavigation from "./DiaryStackNavigation";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryStack"
      screenOptions={{
        presentation: "containedModal",
        headerShown: false,
      }}
    >
      <Stack.Screen name="DiaryStack" component={DiaryStackNavigation} />
      <Stack.Screen name="AddDiary" component={AddDiaryScreen} />
    </Stack.Navigator>
  );
};
