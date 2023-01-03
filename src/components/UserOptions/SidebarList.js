import classes from "./SidebarList.module.css";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import TripContext from "../../store/trip-context";
import InfoModal from "../UI/InfoModal";

const SidebarList = ({ isOpen, onClose }) => {
  const tripContext = useContext(TripContext);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const showTripsHandler = () => {
    tripContext.showAllTrips();
    onClose();
  };
  const closeInfoHandler = () => {
    setShowInfoModal(false);
  };
  const addNewTripInfoHandler = () => {
    setShowInfoModal(true);
    onClose();
  };
  return (
    <ul className={classes.sidebar__list}>
      <li>
        <button onClick={showTripsHandler}>Show All Trips</button>
      </li>
      <li>
        <button onClick={addNewTripInfoHandler}>Add New Trip</button>
      </li>
      <li>
        <NavLink to="/account">Account settings</NavLink>
      </li>
      {showInfoModal && (
        <InfoModal
          message="Click anywhere on the map to add new trip."
          onClose={closeInfoHandler}
        />
      )}
    </ul>
  );
};

export default SidebarList;
