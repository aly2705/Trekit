import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import AddNewForm from "../Trips/AddNewForm";
import { useState } from "react";
import { trips } from "../../store/trips"; // will be fetched
import Pin from "./Pin";
import TripOverview from "../Trips/TripOverview";

const ClickGetCoords = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
};

const Map = () => {
  //const [locations, setLocations] = useState(DUMMY__LOCATIONS);
  //Will fetch data from db
  const [newCoords, setNewCoords] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);

  const addNewHandler = (position) => {
    const location = [position.lat, position.lng];
    setFormIsVisible(true);
    setNewCoords(location);
  };
  const closeFormHandler = () => {
    setFormIsVisible(false);
  };
  const openTripOverview = (trip) => {
    setTripDetails(trip);
  };
  const closeOverviewHandler = () => {
    setTripDetails(null);
    setFormIsVisible(false);
  };

  return (
    <MapContainer
      center={[48.155022, 11.3770298]}
      zoom={5}
      minZoom={2.5}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <ClickGetCoords onClick={addNewHandler} />
      {trips.map((trip, i) => (
        <Pin trip={trip} key={i} onOpenOverview={openTripOverview} />
      ))}
      <AddNewForm
        coords={newCoords}
        isVisible={formIsVisible}
        onClose={closeFormHandler}
      />
      <TripOverview trip={tripDetails} onClose={closeOverviewHandler} />
    </MapContainer>
  );
};

export default Map;
