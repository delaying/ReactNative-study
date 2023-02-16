import { Text, View } from "react-native";
import HookTest from "./components/HookTest";
import Typography from "./components/Typography";

export default () => {
  return (
    <View>
      <Text>Tab A</Text>
      <HookTest a={3} b={5} />
      <Typography color="red" fontSize={"hh"} text="ajsfd" />
    </View>
  );
};
