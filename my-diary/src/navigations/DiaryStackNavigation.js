import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiaryDetailScreen from "../screens/DiaryDetailScreen";
import DiaryListScreen from "../screens/DiaryListScreen";
import SettingScreen from "../screens/SettingScreen";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName="DiaryList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DiaryList" component={DiaryListScreen} />
      <Stack.Screen name="DiaryDetail" component={DiaryDetailScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};
