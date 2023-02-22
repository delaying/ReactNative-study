import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteNewsListScreen from "../screens/FavoriteNewsListScreen";
import NewsListScreen from "../screens/NewsListScreen";
import { TabIcon } from "../components/TabIcon";

const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    <BottomTab.Navigator
      screenOptions={(routes) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const getIconName = () => {
            if (routes.route.name === "FavoriteNewsList") {
              return "star";
            }
            return "home";
          };
          const iconName = getIconName();
          return <TabIcon name={iconName} color={color} />;
        },
      })}
    >
      <BottomTab.Screen
        name="NewsList"
        component={NewsListScreen}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="FavoriteNewsList"
        component={FavoriteNewsListScreen}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};
