"use client";

import dynamic from "next/dynamic";

import { useMap } from 'react-leaflet';
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer))
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer))
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker))
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup))

import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';

import useUserLocation from "@/lib/hooks/useUserLocation";

// Define the shape of each marker's data
export interface MarkerData {
  position: [number, number];
  popupText: string;
  type?: string; // Optional field for differentiating marker types
}

interface MapComponentProps {
  markers?: MarkerData[];
}

// This helper component updates the map view when the user's location is available.
const RecenterAutomatically: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ markers = [] }) => {
  const defaultCenter: [number, number] = [51.505, -0.09];

  const { userLocation, locationError, requestLocation } = useUserLocation();
  useEffect(() => {requestLocation();}, []);

  // Use the user's location if available; otherwise, fall back to defaultCenter.
  const center = userLocation || defaultCenter;

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {userLocation && <RecenterAutomatically lat={userLocation[0]} lng={userLocation[1]} />}
      {markers.map((marker: MarkerData, index: number) => (
        <Marker
          key={index}
          position={marker.position}
        >
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

        { /* For custom icons, you might add: icon={marker.type === 'friend' ? friendIcon : undefined} */ }
