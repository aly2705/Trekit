import React, { useCallback, useState } from "react";

const TripContext = React.createContext({
  trips: [],
  showAll: {},
  setTrips: (trips) => {},
  addNewTrip: (trip) => {},
  deleteTrip: (tripId) => {},
  updateTrip: (trip) => {},
  showAllTrips: () => {},
  endShowAll: () => {},
});

export const TripContextProvider = (props) => {
  const [trips, setTrips] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const tripHandler = useCallback((fetchedTrips) => {
    setTrips(fetchedTrips);
  }, []);

  const addNewTripHandler = (trip) => {
    setTrips((prev) => [...prev, trip]);
  };

  const updateTripHandler = (updTrip) => {
    setTrips((prev) => {
      const newTrips = prev.map((trip) => {
        if (trip._id === updTrip._id) {
          return updTrip;
        } else return trip;
      });
      return newTrips;
    });
  };

  const deleteTripHandler = (tripId) => {
    setTrips((prev) => {
      const newTrips = prev.filter((trip) => trip._id !== tripId);
      return newTrips;
    });
  };

  const showAllTrips = () => {
    setShowAll(true);
  };
  const endShowAll = () => {
    setShowAll(false);
  };

  return (
    <TripContext.Provider
      value={{
        trips: trips,
        showAll,
        setTrips: tripHandler,
        addNewTrip: addNewTripHandler,
        deleteTrip: deleteTripHandler,
        updateTrip: updateTripHandler,
        showAllTrips: showAllTrips,
        endShowAll,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};

export default TripContext;
