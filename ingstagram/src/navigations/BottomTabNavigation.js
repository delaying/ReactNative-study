import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { TabIcon } from "../components/TabIcon";
import MyPageScreen from "../screens/MyPageScreen";

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconName = () => {
          if (route.name === "MyPage") {
            return "person";
          }

          return "home";
        };

        const routeIconName = getIconName();

        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <TabIcon name={routeIconName} color={color} />;
          },
        };
      }}
    >
      <BottomTab.Screen name="HOME" component={HomeScreen} />
      <BottomTab.Screen name="MyPage" component={MyPageScreen} />
    </BottomTab.Navigator>
  );
};
