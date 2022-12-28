import React, { useCallback, useState } from "react";

const TripContext = React.createContext({
  trips: [],
  setTrips: (trips) => {},
  addNewTrip: (trip) => {},
});

export const TripContextProvider = (props) => {
  const [trips, setTrips] = useState([]);

  const tripHandler = useCallback((fetchedTrips) => {
    setTrips(fetchedTrips);
  }, []);

  const addNewTripHandler = (trip) => {
    setTrips((prev) => [...prev, trip]);
  };

  return (
    <TripContext.Provider
      value={{
        trips: trips,
        setTrips: tripHandler,
        addNewTrip: addNewTripHandler,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};

export default TripContext;
