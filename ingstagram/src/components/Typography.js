import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

export const Typography = (props) => {
  return (
    <RNText
      style={{
        color: props.color,
        fontSize: props.fontSize,
      }}
      numOfLines={props.numberOfLines}
    >
      {props.children}
    </RNText>
  );
};
