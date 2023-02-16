import { Text } from "react-native";
import PropTypes from "prop-types";

export default ({ color, fontSize, text }) => {
  return <Text style={{ color: color, fontSize: fontSize }}>{text}</Text>;
};
