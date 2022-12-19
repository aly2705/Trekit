import classes from "./Overlay.module.css";
import { Fragment } from "react";

const Overlay = ({ visible, onClose }) => {
  const closeHandler = () => {
    onClose();
  };
  return (
    <Fragment>
      {visible && (
        <div className={classes.overlay} onClick={closeHandler}></div>
      )}
    </Fragment>
  );
};

export default Overlay;
