// import markerIconPng from "leaflet/dist/images/marker-icon.png";
// import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

// import { useEffect } from "react";
import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      center={[48.155022, 11.3770298]}
      zoom={5}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      {/* <Marker
        position={[48.155022, 11.3770298]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 10],
          })
        }
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
