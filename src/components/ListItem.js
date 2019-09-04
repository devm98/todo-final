import React from "react";

export default function ListItem(props) {
  return (
    <div
      style={{
        width: props.widths,
        borderRight: "1px solid",
        paddingRight: "10px"
      }}
    >
      {props.children}
    </div>
  );
}
