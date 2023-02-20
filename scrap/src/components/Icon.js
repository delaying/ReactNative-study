import React from "react";
import IonVectorIcons from "@expo/vector-icons/Ionicons";
import propTypes from "prop-types";

export const Icon = (props) => {
  return (
    <IonVectorIcons
      name={props.iconName}
      size={props.iconSize}
      color={props.iconColor}
    />
  );
};
