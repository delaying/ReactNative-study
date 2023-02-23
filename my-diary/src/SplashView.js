import { useEffect } from "react";
import { View } from "react-native";
import { Typography } from "./components/Typography";

export default (props) => {
  useEffect(() => {
    props.onFinishLoad();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography fontSize={26}>SPLASH</Typography>
    </View>
  );
};
