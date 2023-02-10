import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

export default ({ size, isBookmarked, onPress, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  );
};
