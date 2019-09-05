import React from "react";
import PopupNoticed from "./PopupNoticed";
const styleItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0"
};

class Item extends React.Component {
  state = {
    value: this.props.title.trim(),
    dismiss: "none",
    notification: ""
  };
  componentWillMount() {
    if (localStorage && localStorage.getItem("value")) {
      let value = JSON.parse(localStorage.getItem("value"));
      this.setState({ value: value });
    }
    if (localStorage && localStorage.getItem("changeVL")) {
      let value = JSON.parse(localStorage.getItem("changVL"));
      if (value == this.props.title.trim()) {
        this.setState({ notification: "*You not update!!!*" });
      }
    }
  }
  removeItem = () => {
    this.props.remove(this.props.id);
  };
  checkStatusHandler = () => {
    this.props.check(this.props.id);
  };
  saveDataHandler = () => {
    if (this.state.value !== this.props.title.trim()) {
      if (this.props.displayNoticed(this.state.value)) {
        this.props.update(this.state.value, this.props.id);
        this.setState({ value: this.state.value.trim() });
        localStorage.setItem("value", JSON.stringify(this.props.title.trim()));
        localStorage.removeItem("value");
      }
    }
  };
  changeStateHandler = () => {
    this.setState({
      dismiss: "modal",
      notification: ""
    });
  };
  changeTitleHandler = e => {
    this.setState({ value: e.target.value, notification: "" });
    localStorage.setItem("changeVl", JSON.stringify(e.target.value));
    localStorage.removeItem("changeVl");
    if (e.target.value !== this.props.title.trim()) {
      if (this.props.displayNoticed(e.target.value) === true) {
        this.setState({
          dismiss: "modal"
        });
      } else if (this.props.displayNoticed(e.target.value) === false) {
        this.setState({
          dismiss: "none",
          notification: "*This title already exists !!!*"
        });
      } else if (this.props.displayNoticed(e.target.value) === null) {
        this.setState({
          dismiss: "none",
          notification: "*This field cannot be empty!!!*"
        });
      }
    } else {
      this.setState({
        dismiss: "modal",
        notification: "*You not update!!!*"
      });
    }
  };
  defaultValue = () => {
    this.setState({ value: this.props.title.trim(), notification: "" });
  };

  render() {
    return (
      <div style={styleItem}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            onClick={this.checkStatusHandler}
            type="checkbox"
            className="mr-3"
            checked={this.props.done}
            id={`checked${this.props.stt}`}
            readOnly
          />
          <label
            style={{
              textDecoration: this.props.done ? "line-through" : null,
              margin: 0
            }}
            htmlFor={`checked${this.props.stt}`}
          >
            {this.props.stt}. {this.props.title}
          </label>
        </div>
        <div>
          <button
            onClick={this.changeStateHandler}
            type="button"
            className="btn btn-primary mr-2"
            data-toggle="modal"
            data-target={`#edit${this.props.stt}`}
          >
            <i className="far fa-edit"></i>
          </button>
          <div
            className="modal fade"
            id={`edit${this.props.stt}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            {/* popup-edit */}
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Edit task
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <input
                        onChange={this.changeTitleHandler}
                        value={this.state.value}
                        type="text"
                        className="form-control"
                        placeholder="Enter title"
                      />
                      <p
                        style={{ height: "5px" }}
                        className="mt-2 text-left text-danger"
                      >
                        {!this.props.display ? this.state.notification : ""}
                      </p>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.defaultValue}
                  >
                    Close
                  </button>
                  <button
                    onClick={this.saveDataHandler}
                    type="button"
                    className="btn btn-primary"
                    data-dismiss={this.state.dismiss}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
            {/* end popup-edit */}
          </div>
          <button
            type="button"
            className="btn btn-danger"
            data-toggle="modal"
            data-target={`#edit${this.props.stt + "remove"}`}
          >
            <i className="fas fa-trash"></i>
          </button>
          <PopupNoticed
            idPopup={`edit${this.props.stt + "remove"}`}
            contentPopup="Are you sure remove task ?"
            noticedPopup={this.removeItem}
          />
        </div>
      </div>
    );
  }
}

export default Item;
