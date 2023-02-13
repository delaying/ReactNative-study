import { Button, Text, View } from "react-native";

export default ({ route }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text>B스크린 A에서받은값{route.params.value}</Text>
      <Button
        title="뒤로"
        onPress={() => {
          console.log("gg");
        }}
      />
    </View>
  );
};
