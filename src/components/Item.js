import React from "react";

const Item = props => {
  const removeItem = () => {
    props.remove(props.id);
  };
  const checkStatusHandler = () => {
    props.check(props.id);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div className="mb-3">
        <input
          onClick={checkStatusHandler}
          type="checkbox"
          className="mr-3"
          checked={props.done}
          id={`checked${props.stt}`}
        />
        <label
          style={{ textDecoration: props.done ? "line-through" : null }}
          htmlFor={`checked${props.stt}`}
        >
          {props.stt}. {props.title}
        </label>
      </div>
      <button
        onClick={removeItem}
        style={{
          background: "#EA2027",
          cursor: "pointer",
          borderRadius: "5px",
          outline: "none",
          color: "white",
          border: "1px solid #EA2027",
          fontWeight: "600",
          padding: "5px 10px"
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};
export default Item;
