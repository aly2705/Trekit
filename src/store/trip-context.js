import React, { useCallback, useState } from "react";

const TripContext = React.createContext({
  trips: [],
  setTrips: (trips) => {},
  addNewTrip: (trip) => {},
  deleteTrip: (tripId) => {},
});

export const TripContextProvider = (props) => {
  const [trips, setTrips] = useState([]);

  const tripHandler = useCallback((fetchedTrips) => {
    setTrips(fetchedTrips);
  }, []);

  const addNewTripHandler = (trip) => {
    setTrips((prev) => [...prev, trip]);
  };

  const deleteTripHandler = (tripId) => {
    setTrips((prev) => {
      const newTrips = prev.filter((trip) => trip._id !== tripId);
      return newTrips;
    });
  };

  return (
    <TripContext.Provider
      value={{
        trips: trips,
        setTrips: tripHandler,
        addNewTrip: addNewTripHandler,
        deleteTrip: deleteTripHandler,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};

export default TripContext;
