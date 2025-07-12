import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const SensorMap = ({ device }) => {
  // Check for valid data
  if (!device || !device.latitude || !device.longitude) {
    return <div className="text-red-500">Invalid sensor data</div>;
  }

  const position = [device.latitude, device.longitude];

  return (
    <div className="h-96 rounded-lg shadow border">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>{device.name || device.sensor_id}</strong>
            <br />
            Status: {device.status}
            <br />
            Last Seen: {new Date(device.lastSeen).toLocaleString()}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default SensorMap;

