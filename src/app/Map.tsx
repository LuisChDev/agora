"use client";

import dynamic from "next/dynamic";
import { useMap } from 'react-leaflet';

// Import Leaflet components dynamically to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then((mod) => mod.ZoomControl), { ssr: false });

import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import useUserLocation from "@/lib/hooks/useUserLocation";
import { Map } from "leaflet";

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

  // Add sample markers for demo purposes
  const sampleMarkers: MarkerData[] = [
    { position: [51.505, -0.09], popupText: "Central Park • Public Event", type: "event" },
    { position: [51.51, -0.1], popupText: "Jane's Coffee Shop • Friend is here", type: "friend" },
    { position: [51.49, -0.08], popupText: "Downtown Concert • Music Universe", type: "universe" },
  ];

  const allMarkers = [...markers, ...sampleMarkers];

  // Request user location on component mount
  useEffect(() => {
    requestLocation();
  }, []);

  // Use the user's location if available; otherwise, fall back to defaultCenter.
  const center = userLocation || defaultCenter;

  // Floating action buttons for mobile view
  const FloatingActionButtons = () => (
    <div className="absolute bottom-20 right-4 md:bottom-4 flex flex-col gap-2 z-10">
      <button
        className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => userLocation && map?.setView(userLocation, 15)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button
        className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );

  // Map controls component
  const MapControls = () => (
    <div className="absolute top-4 left-4 z-10 bg-white dark:bg-gray-800 rounded shadow-md p-2 flex flex-col gap-2">
      <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </button>
      <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
    </div>
  );

  // Map search component
  const MapSearch = () => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-3/4 md:w-1/3">
      <div className="relative">
        <input
          type="text"
          placeholder="Search places, events, or friends..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  );

  // Use a ref to access the map instance
  const [map, setMap] = useState<Map | null>(null);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomleft" />

        {userLocation && <RecenterAutomatically lat={userLocation[0]} lng={userLocation[1]} />}

        {/* Render all markers */}
        {allMarkers.map((marker: MarkerData, index: number) => (
          <Marker
            key={index}
            position={marker.position}
          >
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* UI Controls */}
      <MapControls />
      <MapSearch />
      <FloatingActionButtons />
    </div>
  );
};

export default MapComponent;
