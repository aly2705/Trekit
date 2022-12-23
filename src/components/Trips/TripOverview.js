import BottomSection from "../UI/BottomSection";
import classes from "./TripOverview.module.css";
import icons from "../../assets/icons.svg";

const TripOverview = ({ trip, onClose, onOpenEditForm }) => {
  const openEditFormHandler = () => {
    onOpenEditForm(trip.id);
  };
  return (
    <BottomSection isVisible={!!trip}>
      {trip && (
        <div className={classes.overview}>
          <div className={classes.overview__btns}>
            <button
              type="button"
              className={classes.overview__delete}
              onClick={onClose}
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
              onClick={onClose}
            >
              <svg>
                <use href={`${icons}#icon-chevron-down`}></use>
              </svg>
            </button>
          </div>
          <img
            src={trip.imageUrl}
            alt="city"
            className={classes.overview__img}
          />
          <h2>
            <span>
              {trip.city}, {trip.country}
            </span>
          </h2>
          <div className={classes.overview__dates}>
            <div className={classes.overview__date}>
              <span>Start date:</span>
              <span>{trip.startDate}</span>
            </div>
            <div className={classes.overview__date}>
              <span>End date:</span>
              <span>{trip.endDate}</span>
            </div>
          </div>
          <p className={classes.overview__description}>{trip.description}</p>
        </div>
      )}
    </BottomSection>
  );
};

export default TripOverview;
