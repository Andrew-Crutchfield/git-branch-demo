import React from 'react';
import { Chirp } from '../types'; 

interface HomePageProps {
  chirps: Chirp[]; 
}

const HomePage: React.FC<HomePageProps> = ({ chirps }) => {
  return (
    <div className="alert alert-info text-center">
      {chirps.length > 0 ? (
        <ul>
          {chirps.map((chirp) => (
            <li key={chirp.id}>{chirp.content}</li> 
          ))}
        </ul>
      ) : (
        <span>No chirps found</span>
      )}
    </div>
  );
};

export default HomePage;

