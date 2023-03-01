import React from "react";
import { Typography } from "../Typography";

export const HeaderTitle = (props) => {
  return (
    <Typography color="black" fontSize={18}>
      {props.title}
    </Typography>
  );
};
