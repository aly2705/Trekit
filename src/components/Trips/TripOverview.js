import BottomSection from "../UI/BottomSection";
import classes from "./TripOverview.module.css";
import icons from "../../assets/icons.svg";

const TripOverview = ({ trip, onClose }) => {
  return (
    <BottomSection isVisible={!!trip}>
      {trip && (
        <div className={classes.overview}>
          <button
            type="button"
            className={classes.overview__close}
            onClick={onClose}
          >
            <svg>
              <use href={`${icons}#icon-chevron-down`}></use>
            </svg>
          </button>
          <img
            src={trip.imageUrl}
            alt="city"
            className={classes.overview__img}
          />
          <h2>
            {trip.city}, {trip.country}
          </h2>
          <div>{trip.description}</div>
        </div>
      )}
    </BottomSection>
  );
};

export default TripOverview;
