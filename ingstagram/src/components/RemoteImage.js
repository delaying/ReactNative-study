import { Image } from "react-native";
import propTypes, { number, string } from "prop-types";

export const RemoteImage = (props) => {
  return (
    <Image
      source={{ uri: props.url }}
      style={[props.style, { width: props.width, height: props.height }]}
    />
  );
};
