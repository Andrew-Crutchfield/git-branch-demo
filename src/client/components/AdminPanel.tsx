import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chirp } from '../types'; 
const AdminChirps = () => {
    const [chirps, setChirps] = useState<Chirp[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/chirps')
            .then((response) => response.json())
            .then((data) => setChirps(data))
            .catch((error) => console.error('Fetch error:', error));
    }, []);

    const handleDeleteChirp = async (chirpId: number) => {
        // ... existing delete logic
    };

    const handleEditChirp = (chirpId: number) => {
        navigate(`/edit-chirp/${chirpId}`);
    };

    return (
        <div>
            {chirps.map((chirp) => (
                <div key={chirp.id}>
                    <p>{chirp.content}</p> // Update property name as per your Chirp interface
                    <button onClick={() => handleEditChirp(chirp.id)}>Edit</button>
                    <button onClick={() => handleDeleteChirp(chirp.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default AdminChirps;