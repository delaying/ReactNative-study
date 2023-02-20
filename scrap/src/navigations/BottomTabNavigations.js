import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteImageListScreen from "../screen/FavoriteImageListScreen";
import ImageListScreen from "../screen/ImageListScreen";
import { TabIcon } from "../components/TabIcon";

const Tabs = createBottomTabNavigator();

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const getIconName = () => {
            if (route.name === "ImageList") {
              return "home";
            }

            if (route.name === "FavoriteImageList") {
              return "star";
            }
          };
          const iconName = getIconName();
          return (
            <TabIcon
              iconName={iconName}
              iconColor={focused ? "tomato" : "grey"}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ImageList" component={ImageListScreen} />
      <Tabs.Screen
        name="FavoriteImageList"
        component={FavoriteImageListScreen}
      />
    </Tabs.Navigator>
  );
};
