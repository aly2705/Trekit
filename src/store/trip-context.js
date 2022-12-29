import React, { useCallback, useState } from "react";

const TripContext = React.createContext({
  trips: [],
  setTrips: (trips) => {},
  addNewTrip: (trip) => {},
  deleteTrip: (tripId) => {},
  updateTrip: (trip) => {},
});

export const TripContextProvider = (props) => {
  const [trips, setTrips] = useState([]);

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

  return (
    <TripContext.Provider
      value={{
        trips: trips,
        setTrips: tripHandler,
        addNewTrip: addNewTripHandler,
        deleteTrip: deleteTripHandler,
        updateTrip: updateTripHandler,
      }}
    >
      {props.children}
    </TripContext.Provider>
  );
};

export default TripContext;
