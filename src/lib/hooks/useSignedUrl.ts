import { useState, useEffect } from 'react';

export const useSignedUrl = (interestId: string) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSignedUrl() {
      try {
        const response = await fetch(`/api/interests/${interestId}`);
        const data = await response.json();
        setUrl(data.url);
      } catch (err: any) {
        console.error('Error fetching signed URL:', err);
        setError(err);
      }
    }
    fetchSignedUrl();
  }, [interestId]);

  return { url, error };
};
