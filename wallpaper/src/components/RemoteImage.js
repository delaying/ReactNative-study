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

// RemoteImage.propTypes = {
//   url: propTypes.string.isRequired,
//   width: propTypes.number,
//   height: propTypes.number,
//   style: propTypes.object,
// };
