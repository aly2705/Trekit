import Modal from "./Modal";
import classes from "./InfoModal.module.css";
import Button from "./Button";

const InfoModal = ({ message, onClose }) => {
  return (
    <Modal onClose={onClose} className={classes.info}>
      <p>{message}</p>
      <div className={classes.info__btn}>
        <Button onClick={onClose}>Ok</Button>
      </div>
    </Modal>
  );
};

export default InfoModal;
