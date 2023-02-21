import React from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";

export const HeaderIcon = (props) => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.iconName} size={28} />
    </Button>
  );
};
