import React from "react";
import { Badge } from "./Badge";
import { Icon } from "./Icon";

export const TabIcon = (props) => {
  if (props.visibleBadge) {
    return (
      <Badge fontSize={10}>
        <Icon name={props.name} size={20} color={props.color} />
      </Badge>
    );
  }

  return <Icon name={props.name} size={20} color={props.color} />;
};
