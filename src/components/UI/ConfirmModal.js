import Modal from "./Modal";
import Button from "./Button";
import classes from "./ConfirmModal.module.css";

const ConfirmModal = ({ message, onClose, onConfirm }) => {
  return (
    <Modal className={classes.confirm} onClose={onClose}>
      <h2>Are you sure?</h2>
      <p>{message}</p>
      <div className={classes.confirm__btns}>
        <Button secondary={true} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
