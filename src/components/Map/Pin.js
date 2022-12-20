import { Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "./Pin.css";

const Pin = ({ trip, onOpenOverview }) => {
  const openOverviewHandler = () => {
    onOpenOverview(trip);
  };
  return (
    <Marker
      position={trip.coords}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>
        <img src={trip.imageUrl} alt="city" onClick={openOverviewHandler} />
        <span>
          {trip.city}, {trip.country}
        </span>
      </Popup>
    </Marker>
  );
};

export default Pin;
