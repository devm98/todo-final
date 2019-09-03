import React, { Component } from "react";
const styleIpt = {
  width: "90%",
  padding: "10px",
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px",
  outline: "none",
  border: "1px solid #3498db"
};
const styleBtn = {
  background: "#be2edd",
  padding: "10px 0",
  cursor: "pointer",
  width: "10%",
  borderTopRightRadius: "5px",
  borderBottomRightRadius: "5px",
  borderWidth: "1px 1px 1px 0",
  outline: "none",
  color: "yellow",
  border: "1px solid #be2edd",
  fontWeight: "600"
};
export default class InputGroup extends Component {
  state = {
    value: ""
  };
  changeValueHanler = event => {
    this.setState({ value: event.target.value });
  };
  submitHandler = event => {
    event.preventDefault();
    let vl = this.state.value.trim();
    if (vl !== "") {
      this.props.add(vl);
    } else {
      alert("Nho nhap ban oi ~");
    }
    this.state.value = "";
  };
  render() {
    return (
      <form className="mb-2" onSubmit={this.submitHandler}>
        <input
          onChange={this.changeValueHanler}
          value={this.state.value}
          type="text"
          placeholder="Input your here..."
          style={styleIpt}
        />
        <button
          data-toggle="modal"
          data-target="#popupNoticed"
          type="submit"
          style={styleBtn}
        >
          ADD TASK
        </button>
      </form>
    );
  }
}
