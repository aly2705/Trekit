import Modal from "./Modal";
import Button from "./Button";
import classes from "./ConfirmModal.module.css";

const ConfirmModal = (props) => {
  return (
    <Modal className={classes.confirm} onClose={props.onClose}>
      <h2>Are you sure?</h2>
      <p>{props.message}</p>
      <div className={classes.confirm__btns}>
        <Button secondary={true} onClick={props.onClose}>
          Cancel
        </Button>
        <Button onClick={props.onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
