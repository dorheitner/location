import React from "react";
import classes from "./ErrorHandler.module.css";
export default function ErrorHandler(props) {
  return props.errors ? (
    <div id={classes.snackbar} className={classes.show}>
      {props.errors[0]}
    </div>
  ) : null;
}
