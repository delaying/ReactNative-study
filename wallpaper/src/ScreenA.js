import { Button, Text, View } from "react-native";
import ScreenC from "./ScreenC";

export default ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>ScreenA</Text>

      <Button
        title="B스크린으로 이동"
        onPress={() => {
          navigation.navigate("ScreenB", { value: "fromA" });
        }}
      />
      <Button
        title="C스크린으로 이동"
        onPress={() => {
          navigation.navigate("Nested", { Screen: "ScreenC" });
        }}
      />
    </View>
  );
};
