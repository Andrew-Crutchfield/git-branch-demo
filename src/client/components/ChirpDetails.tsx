import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chirp } from '../types'; 
const ChirpDetails: React.FC = () => {
    const [chirp, setChirp] = useState<Chirp | null>(null);

    const { id } = useParams<'id'>(); 

    useEffect(() => {
        fetch(`http://localhost:3000/api/chirps/${id}`)
            .then(res => res.json())
            .then(data => {
                setChirp(data);
            })
            .catch(e => console.log('[fetch error]', e));
    }, [id]);

    if (!chirp) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>{chirp.content}</h3> // Make sure 'body' is the correct property name in your Chirp interface
        </div>
    );
};

export default ChirpDetails;