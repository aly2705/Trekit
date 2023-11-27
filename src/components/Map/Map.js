import "leaflet/dist/leaflet.css";
import "./Map.css";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import AddNewForm from "../Trips/AddNewForm";
import { useContext, useEffect, useState } from "react";
import TripContext from "../../store/trip-context";
import Pin from "./Pin";
import TripOverview from "../Trips/TripOverview";
import useAJAX from "../../hooks/useAJAX";
import { API_URL } from "../../helpers/config";
import AuthContext from "../../store/auth-context";
import Leaflet from "leaflet";

const ClickGetCoords = ({ onClick, formIsVisible }) => {
  useMapEvents({
    click(e) {
      if (!formIsVisible) {
        onClick(e.latlng);
      }
    },
  });
  return null;
};
const ShowAllTrips = ({ trips }) => {
  const map = useMap();
  const tripContext = useContext(TripContext);

  useEffect(() => {
    if (tripContext.showAll && trips.length) {
      const markers = trips.map((trip) => Leaflet.marker(trip.coords));
      const group = new Leaflet.featureGroup(markers);
      map.fitBounds(group.getBounds());
      tripContext.endShowAll();
    }
  });

  return null;
};

const Map = () => {
  const { trips, setTrips } = useContext(TripContext);
  const { token } = useContext(AuthContext);
  const [newCoords, setNewCoords] = useState(null);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [tripDetails, setTripDetails] = useState(null);
  const [tripEdited, setTripEdited] = useState(null);
  const { sendRequest: fetchTrips, isLoading } = useAJAX();

  useEffect(() => {
    const configObj = {
      url: `${API_URL}/trips`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const setTripsToFetchedData = (data) => {
      const trips = data.data.trips;
      setTrips(trips);
    };
    fetchTrips(configObj, setTripsToFetchedData);
  }, [token, fetchTrips, setTrips]);

  const addNewHandler = (position) => {
    const location = [position.lat, position.lng];
    if (!tripDetails) setFormIsVisible(true);
    setNewCoords(location);
  };
  const closeFormHandler = () => {
    setFormIsVisible(false);
    setTripEdited(null);
  };
  const openTripOverview = (trip) => {
    setTripDetails(trip);
  };
  const closeOverviewHandler = () => {
    setTripDetails(null);
    setFormIsVisible(false);
  };
  const openEditFormHandler = (tripId) => {
    setTripDetails(null);
    // Make an option for an editing form
    setFormIsVisible(true);
    setTripEdited(tripId);
  };

  return (
    <MapContainer
      center={[48.155022, 11.3770298]}
      zoom={5}
      minZoom={2.5}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ClickGetCoords onClick={addNewHandler} formIsVisible={formIsVisible} />
      <ShowAllTrips trips={trips} />
      {trips.length > 0 &&
        trips.map((trip, i) => (
          <Pin trip={trip} key={i} onOpenOverview={openTripOverview} />
        ))}
      <AddNewForm
        coords={newCoords}
        isVisible={formIsVisible}
        onClose={closeFormHandler}
        isEditing={tripEdited}
      />
      <TripOverview
        trip={tripDetails}
        onClose={closeOverviewHandler}
        onOpenEditForm={openEditFormHandler}
      />
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      )}
    </MapContainer>
  );
};

export default Map;
