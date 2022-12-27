import React, { useCallback, useState } from "react";

const TripContext = React.createContext({
  trips: [],
  setTrips: (trips) => {},
});

export const TripContextProvider = (props) => {
  const [trips, setTrips] = useState([]);

  const tripHandler = useCallback((fetchedTrips) => {
    setTrips(fetchedTrips);
  }, []);

  return (
    <TripContext.Provider value={{ trips: trips, setTrips: tripHandler }}>
      {props.children}
    </TripContext.Provider>
  );
};

export default TripContext;
