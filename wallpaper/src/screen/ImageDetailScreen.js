import { View } from "react-native";
import Typography from "../components/Typography";

export default (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Typography
        color={"black"}
        fontSize={14}
        text="image detail"
      ></Typography>
    </View>
  );
};
