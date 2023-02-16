import { useMemo } from "react";
import { View } from "react-native";

export default (props) => {
  const text = useMemo(() => {
    return props.a + props.b;
  }, [props.a, props.b]);
  return <View>결과값: {text}</View>;
};
