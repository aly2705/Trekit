import { Fragment } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import Overlay from "./Overlay";

const ModalWindow = (props) => {
  return (
    <div className={`${classes.modal} ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

const portal = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalWindow className={props.className || ""}>
          {props.children}
        </ModalWindow>,
        portal
      )}
      {ReactDOM.createPortal(
        <Overlay visible={true} onClose={props.onClose} zIndex={11000} />,
        portal
      )}
    </Fragment>
  );
};

export default Modal;
