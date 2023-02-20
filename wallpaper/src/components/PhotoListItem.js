import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Animated, useWindowDimensions } from "react-native";
import { Button } from "./Button";
import { RemoteImage } from "./RemoteImage";

export default (props) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));

  const onPreeItem = useCallback(() => {
    navigation.navigate("ImageDetail", { url: props.url });
  }, []);

  const onPressIn = useCallback(() => {
    console.log("in");
    Animated.timing(animValue, {
      duration: 200,
      toValue: 1,
    }).start();
  }, []);

  const onPressOut = useCallback(() => {
    console.log("out");
    Animated.timing(animValue, {
      duration: 200,
      toValue: 0,
    }).start();
  }, []);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.95],
  });

  return (
    <Button
      onPress={onPreeItem}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      paddingHorizontal={20}
      paddingVertical={10}
    >
      <Animated.View style={{ transform: [{ scale: scale }] }}>
        <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
      </Animated.View>
    </Button>
  );
};
