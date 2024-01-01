import React, { useEffect, useState } from 'react';
import { fetchWithRootUrl, transformChirpApiResponse } from '../utils/api';

const ChirpList: React.FC = () => {
  const [chirps, setChirps] = useState<any[]>([]);

  const getChirps = async () => {
    try {
      const chirps = await fetchWithRootUrl<any[]>('/api/chirps', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const transformedChirps = transformChirpApiResponse(chirps);

      setChirps(transformedChirps);
    } catch (error) {
      console.error('Error fetching chirps:', error);
    }
  };

  useEffect(() => {
    getChirps();
  }, []);

  return (
    <div>
      {chirps.map((chirp) => (
        <div key={chirp.id}>
          <p>{chirp.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChirpList;