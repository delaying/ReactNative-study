import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

export default ({ onPress, style, NEWCOLOR }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Ionicons name="alarm-outline" size={24} color={NEWCOLOR.GRAY_3_GRAY_2} />
    </TouchableOpacity>
  );
};
