import React from "react";
import { Pressable, View } from "react-native";
import propTypes from "prop-types";

export const Button = (props) => {
  return (
    <Pressable
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onPress={props.onPress}
      hitSlop={props.hitSlop ?? { left: 0, right: 0, top: 0, bottom: 0 }}
      style={{
        paddingHorizontal: props.paddingHorizontal,
        paddingVertical: props.paddingVertical,
      }}
    >
      {props.children}
    </Pressable>
  );
};

export default Button;
