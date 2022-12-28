import classes from "./Overlay.module.css";
import { Fragment } from "react";

const Overlay = ({ visible, onClose, zIndex }) => {
  const closeHandler = () => {
    onClose();
  };
  return (
    <Fragment>
      {visible && (
        <div
          className={classes.overlay}
          onClick={closeHandler}
          style={{ zIndex: zIndex || 9000 }}
        ></div>
      )}
    </Fragment>
  );
};

export default Overlay;
