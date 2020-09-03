import React from "react";

function Message(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankfield)
  ) {
    return (
      <div className="error container help text-danger mt-5 col-sm-4">
        <div className="row justify-content-center help text-danger text-center">
          {props.formerrors.blankfield ? "All fields are required" : ""}
        </div>
      </div>
    );
  } else if (props.apierrors) {
    return (
      <div className="error container help text-danger mt-5 col-sm-4">
        <div className="row justify-content-center text-center">{props.apierrors}</div>
      </div>
    );
  } else if (props.formerrors && props.formerrors.cognito) {
    return (
      <div className="error container help text-danger mt-5 col-sm-4">
        <div className="row justify-content-center text-center">
          {props.formerrors.cognito.message}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}

export default Message;