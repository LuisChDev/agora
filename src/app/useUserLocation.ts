import { useState } from "react";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const fetchIPLocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('IP-based geolocation failed');

      const data = await response.json();
      setUserLocation([data.latitude, data.longitude]);
    } catch (ipError) {
      console.error('IP geolocation error:', ipError);
      setLocationError('Please manually select your location on the map.');
    }
  };

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.warn('Browser geolocation failed:', error);
          fetchIPLocation(); // Fallback to IP-based location
        },
        { timeout: 10000 }
      );
    } else {
      fetchIPLocation();
    }
  };

  return { userLocation, locationError, requestLocation };
};

export default useUserLocation;
