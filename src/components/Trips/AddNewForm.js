import classes from "./AddNewForm.module.css";
import icons from "../../assets/icons.svg";
import BottomSection from "../UI/BottomSection";
import Button from "../UI/Button";
import { useContext, useRef } from "react";
import useAJAX from "../../hooks/useAJAX";
import { API_URL } from "../../helpers/config";
import AuthContext from "../../store/auth-context";
import TripContext from "../../store/trip-context";
import { formatDate } from "../../helpers/helpers";

const AddNewForm = ({ isVisible, onClose, coords, isEditing: isEditingId }) => {
  const cityInputRef = useRef();
  const countryInputRef = useRef();
  const imageInputRef = useRef();
  const startDateInputRef = useRef();
  const endDateInputRef = useRef();
  const descInputRef = useRef();
  const { sendRequest, isLoading, error, setError } = useAJAX();
  const { token } = useContext(AuthContext);
  const tripContext = useContext(TripContext);

  const trip = isEditingId
    ? tripContext.trips.find((trip) => trip._id === isEditingId)
    : undefined;

  const clearForm = () => {
    cityInputRef.current.value = "";
    countryInputRef.current.value = "";
    imageInputRef.current.value = "";
    startDateInputRef.current.value = "";
    endDateInputRef.current.value = "";
    descInputRef.current.value = "";
  };

  if (isEditingId) {
    cityInputRef.current.value = trip.city;
    countryInputRef.current.value = trip.country;
    imageInputRef.current.value = trip.image;
    startDateInputRef.current.value = formatDate(trip.startDate);
    endDateInputRef.current.value = formatDate(trip.endDate);
    descInputRef.current.value = trip.description || "";
  }

  const changeContextAndCloseForm = (APIData) => {
    if (isEditingId) {
      const updatedTrip = APIData.data.updatedTrip;
      tripContext.updateTrip(updatedTrip);
    } else {
      const newTrip = APIData.data.trip;
      console.log(APIData.data.trip);
      tripContext.addNewTrip(newTrip);
    }

    clearForm();
    closeFormHandler();
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const enteredCity = cityInputRef.current.value.trim();
    const enteredCountry = countryInputRef.current.value.trim();
    const enteredImage = imageInputRef.current.value.trim();
    const enteredStartDate = startDateInputRef.current.value;
    const enteredEndDate = endDateInputRef.current.value;
    const enteredDescription = descInputRef.current.value.trim();

    // Date validation
    if (
      new Date(enteredStartDate).getTime() > new Date(enteredEndDate).getTime()
    ) {
      console.log("Will set error");
      setError(new Error("Start date must be before end date"));
      return;
    }

    if (!isEditingId) {
      //Prepare data for post request
      const reqConfig = {
        url: `${API_URL}/trips`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          city: enteredCity,
          country: enteredCountry,
          startDate: enteredStartDate,
          endDate: enteredEndDate,
          image: enteredImage,
          description: enteredDescription || undefined,
          coords,
        },
      };

      sendRequest(reqConfig, changeContextAndCloseForm);
    } else if (isEditingId) {
      // Prepare data for patch request
      const reqConfig = {
        url: `${API_URL}/trips/${isEditingId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: {
          city: enteredCity !== trip.city ? enteredCity : undefined,
          country: enteredCountry !== trip.country ? enteredCountry : undefined,
          startDate: enteredStartDate,
          endDate: enteredEndDate,
          image: enteredImage !== trip.image ? enteredImage : undefined,
          description:
            enteredDescription !== trip.description
              ? enteredDescription
              : undefined,
        },
      };

      sendRequest(reqConfig, changeContextAndCloseForm);
    }
  };

  const closeFormHandler = () => {
    setError(null);
    clearForm();
    onClose();
  };

  return (
    <BottomSection isVisible={isVisible}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h2>{!!isEditingId ? "Edit trip" : "Add new trip"}</h2>
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
        {error && (
          <p className={`error ${classes.form__error}`}>{error.message}</p>
        )}
        <Button className={classes.form__submit} type="submit">
          {!!isEditingId ? "Edit trip" : "Add trip"}
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
        {isLoading && (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </form>
    </BottomSection>
  );
};

export default AddNewForm;
