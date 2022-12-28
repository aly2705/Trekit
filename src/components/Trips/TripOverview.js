import BottomSection from "../UI/BottomSection";
import classes from "./TripOverview.module.css";
import icons from "../../assets/icons.svg";
import ConfirmModal from "../UI/ConfirmModal";
import { useContext, useState } from "react";
import { API_URL } from "../../helpers/config";
import AuthContext from "../../store/auth-context";
import useAJAX from "../../hooks/useAJAX";
import TripContext from "../../store/trip-context";

const TripOverview = ({ trip, onClose, onOpenEditForm }) => {
  const [confirmMessage, setConfirmMessage] = useState(null);
  const { token } = useContext(AuthContext);
  const tripContext = useContext(TripContext);
  const {
    sendRequest: sendDeleteRequest,
    error,
    isLoading,
    setError,
  } = useAJAX();

  const closeOverviewHandler = () => {
    setError(null);
    onClose();
  };

  const openEditFormHandler = () => {
    onOpenEditForm(trip._id);
  };
  const deleteTripHandler = () => {
    setConfirmMessage(null);
    const tripId = trip._id;
    const reqConfig = {
      url: `${API_URL}/trips/${tripId}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const deleteTrip = (_) => {
      tripContext.deleteTrip(tripId);
      onClose();
    };
    sendDeleteRequest(reqConfig, deleteTrip);
  };
  const confirmDeleteHandler = () => {
    setConfirmMessage("Your trip will permanently be deleted");
  };
  const abortConfirmHandler = () => {
    setConfirmMessage(false);
  };
  return (
    <BottomSection isVisible={!!trip}>
      {trip && (
        <div className={classes.overview}>
          <div className={classes.overview__btns}>
            <button
              type="button"
              className={classes.overview__delete}
              onClick={confirmDeleteHandler}
            >
              <svg>
                <use href={`${icons}#icon-bin`}></use>
              </svg>
            </button>
            <button
              type="button"
              className={classes.overview__edit}
              onClick={openEditFormHandler}
            >
              <svg>
                <use href={`${icons}#icon-pencil`}></use>
              </svg>
            </button>
            <button
              type="button"
              className={classes.overview__close}
              onClick={closeOverviewHandler}
            >
              <svg>
                <use href={`${icons}#icon-chevron-down`}></use>
              </svg>
            </button>
          </div>
          <img src={trip.image} alt="city" className={classes.overview__img} />
          <h2>
            <span>
              {trip.city}, {trip.country}
            </span>
          </h2>
          <div className={classes.overview__dates}>
            <div className={classes.overview__date}>
              <span>Start date:</span>
              <span>
                {new Date(trip.startDate).toLocaleString(navigator.language, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={classes.overview__date}>
              <span>End date:</span>
              <span>
                {new Date(trip.endDate).toLocaleString(navigator.language, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <p className={classes.overview__description}>{trip.description}</p>
          {confirmMessage && (
            <ConfirmModal
              onClose={abortConfirmHandler}
              message={confirmMessage}
              onConfirm={deleteTripHandler}
            />
          )}
          {error && <p className="error">{error.message}</p>}
          {isLoading && (
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      )}
    </BottomSection>
  );
};

export default TripOverview;
