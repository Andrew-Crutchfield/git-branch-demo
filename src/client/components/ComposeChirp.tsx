import React, { useState } from 'react';
import { Chirp } from '../types'; 


const ComposeChirp = () => {
  const [chirpMessage, setChirpMessage] = useState('');

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    if (!selectedUserId) {
      console.error('Please select a user to mention.');
      return;
    }
  
    const chirpData: Omit<Chirp, 'id' | 'createdAt'> = {
      userId: selectedUserId,
      content: chirpMessage,
    };
    
    try {
      const response = await fetch('/api/chirps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chirpData),
      });

      if (response.ok) {
        setChirpMessage('');
        setSelectedUserId(null);
      } else {
        const errorData = await response.json();
        console.error('Server responded with an error:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while posting the chirp:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={chirpMessage}
        onChange={(e) => setChirpMessage(e.target.value)}
      />
      <select
        value={selectedUserId ?? ''}
        onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
      >
        <option value="">Select a user</option>
      </select>
      <button type="submit">Post Chirp</button>
    </form>
  );
};

export default ComposeChirp;