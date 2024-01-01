import React, { useState, useEffect } from 'react';
import { Chirp } from '../types';

const ComposeChirp = () => {
  const [chirpMessage, setChirpMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<{ id: number; handle: string }[]>([]); // Assuming the user has an id and a handle

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust the endpoint as necessary
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUserId) {
      console.error('Please select a user to mention.');
      return;
    }

    const chirpData: Omit<Chirp, 'id' | 'createdAt'> = {
      userId: selectedUserId,
      body: chirpMessage,
    };

    try {
      const response = await fetch('/api/chirps', { // Adjust the endpoint as necessary
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
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.handle}
          </option>
        ))}
      </select>
      <button type="submit">Post Chirp</button>
    </form>
  );
};

export default ComposeChirp;