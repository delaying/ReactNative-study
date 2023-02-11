import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";
import { useState } from "react";

const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

  return {
    isBookmarked,
    toggleIsBookmarked,
  };
};

export default ({
  size,
  isBookmarked: isBookmarkedProp,
  onPress,
  style,
  NEWCOLOR,
}) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp);
  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        toggleIsBookmarked();
        //북마크되었는지 db로 넘겨주는 코드
        onPress();
      }}
    >
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4}
      />
    </TouchableOpacity>
  );
};
