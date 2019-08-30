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
    value: this.props.title
  };
  removeItem = () => {
    this.props.remove(this.props.id);
  };
  checkStatusHandler = () => {
    this.props.check(this.props.id);
  };
  saveDataHandler = () => {
    this.props.update(this.state.value, this.props.id);
  };
  changeTitleHandler = e => {
    this.setState({ value: e.target.value });
  };
  defaultValue = () => {
    this.setState({ value: this.props.title });
  };
  render() {
    return (
      <div style={styleItem}>
        <div>
          <input
            onClick={this.checkStatusHandler}
            type="checkbox"
            className="mr-3"
            checked={this.props.done}
            id={`checked${this.props.stt}`}
            readOnly
          />
          <label
            style={{ textDecoration: this.props.done ? "line-through" : null }}
            htmlFor={`checked${this.props.stt}`}
          >
            {this.props.stt}. {this.props.title}
          </label>
        </div>
        <div>
          <button
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
                    data-dismiss="modal"
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
