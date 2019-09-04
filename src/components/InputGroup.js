import React, { Component } from "react";
const styleIpt = {
  width: "30%",
  padding: "10px",
  borderTopLeftRadius: "5px",
  borderBottomLeftRadius: "5px",
  outline: "none",
  border: "1px solid #3498db"
};
const styleBtn = {
  background: "#be2edd",
  padding: "10px",
  cursor: "pointer",
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
      <div>
        <div>
          <p>
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="fas fa-plus"></i>
            </button>
          </p>
          <div className="collapse" id="collapseExample">
            <div
              style={{ padding: 0, border: "none" }}
              className="card card-body"
            >
              <form
                style={{ width: "100%", float: "left" }}
                className="mb-2"
                onSubmit={this.submitHandler}
              >
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
