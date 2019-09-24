import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions";

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

class InputGroup extends Component {
  changeValueHanler = event => {
    console.log(event.target.value);
    this.props.changeValue(event.target.value);
  };
  submitHandler = event => {
    event.preventDefault();
    let vl = this.props.value.trim();
    if (vl !== "") {
      this.props.addTask(this.props.value);
      this.props.cleanValue();
    } else {
      alert("Nho nhap ban oi ~");
    }
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
                  value={this.props.value}
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

const mapStateToProps = state => {
  return {
    value: state.title
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeValue: title => {
      dispatch(actions.changeValue(title));
    },
    addTask: title => {
      dispatch(actions.addTask(title));
    },
    cleanValue: () => {
      dispatch(actions.cleanTitle());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroup);
