import React from "react";

export default function PopupNoticed(props) {
  return (
    <div>
      <div
        className="modal fade"
        id={props.idPopup}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Noticed
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <h3 className="text-danger">{props.contentPopup}</h3>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                data-dismiss="modal"
                type="button"
                className="btn btn-primary"
                onClick={props.noticedPopup}
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
