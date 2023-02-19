import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenC from "./ScreenC";

const Stack = createNativeStackNavigator();

export default () => {
  reuturn(
    <Stack.Navigator>
      <Stack.Screen name="ScreenC" component={ScreenC} />
    </Stack.Navigator>
  );
};
