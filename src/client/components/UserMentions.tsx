import React, { useState, useEffect } from 'react';
import { User } from '../types'; 
import { Chirp } from '../types';

const UserMentions = () => {
    const [users, setUsers] = useState<User[]>([]);

    const [selectedUserId, setSelectedUserId] = useState<string>('');

    const [mentions, setMentions] = useState<Chirp[]>([]);

    useEffect(() => {
        fetch('/api/users') 
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Fetch error:', error));
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            fetch(`/api/mentions/${selectedUserId}`) 
                .then((response) => response.json())
                .then((data) => setMentions(data))
                .catch((error) => console.error('Fetch error:', error));
        }
    }, [selectedUserId]);

    return (
        <div>
            <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
            >
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id.toString()}>
                        {user.username} 
                    </option>
                ))}
            </select>

            <div>
                {mentions.map((chirp) => (
                    <div key={chirp.id}>
                        <p>{chirp.content}</p> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMentions;