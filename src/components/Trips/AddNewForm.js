import classes from "./AddNewForm.module.css";
import icons from "../../assets/icons.svg";
import BottomSection from "../UI/BottomSection";
import Button from "../UI/Button";
import { useRef } from "react";

const AddNewForm = ({ isVisible, onClose: closeFormHandler, coords }) => {
  const cityInputRef = useRef();
  const countryInputRef = useRef();
  const imageInputRef = useRef();
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();
  const descInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredCity = cityInputRef.current.value;
    const enteredCountry = countryInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredStartDate = startDateInputRef.current.value;
    const enteredEndDate = endDateInputRef.current.value;
    const enteredDescription = descInputRef.current.value;

    console.log(
      enteredCity,
      enteredCountry,
      enteredImage,
      enteredStartDate,
      enteredEndDate,
      enteredDescription,
      coords
    );

    //To-do: Validation
    //Send data to api
  };

  return (
    <BottomSection isVisible={isVisible}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h2>Add new trip</h2>
        <div className={classes.form__group}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" required ref={cityInputRef} />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" required ref={countryInputRef} />
        </div>
        <div
          className={`${classes.form__group} ${classes["form__group--img"]}`}
        >
          <label htmlFor="img-url">Image URL</label>
          <input type="text" id="img-url" ref={imageInputRef} />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="start-date">Start date</label>
          <input type="date" id="start-date" required ref={startDateInputRef} />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="end-date">End date</label>
          <input type="date" id="end-date" required ref={endDateInputRef} />
        </div>
        <div className={`${classes.form__group} ${classes.form__description}`}>
          <label htmlFor="description">Trip Description</label>
          <textarea id="description" ref={descInputRef}></textarea>
        </div>
        <Button className={classes.form__submit} type="submit">
          Add Trip
        </Button>
        <button
          type="button"
          onClick={closeFormHandler}
          className={classes.form__close}
        >
          <svg>
            <use href={`${icons}#icon-chevron-down`}></use>
          </svg>
        </button>
      </form>
    </BottomSection>
  );
};

export default AddNewForm;
