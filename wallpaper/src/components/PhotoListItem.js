import { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { Button } from "./Button";
import { RemoteImage } from "./RemoteImage";

export default (props) => {
  const { width } = useWindowDimensions();

  const onPreeItem = useCallback(() => {}, []);

  return (
    <Button onPress={onPreeItem} paddingHorizontal={20} paddingVertical={10}>
      <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
    </Button>
  );
};
