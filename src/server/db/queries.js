const db = require('./db');

const getAllChirps = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM chirps');
        return rows;
    } catch (error) {
        console.error('Error in getAllChirps:', error);
        throw error;
    }
};

const getChirpById = async (chirpId) => {
    try {
        const [rows] = await db.query('SELECT * FROM chirps WHERE id = ?', [chirpId]);
        return rows;
    } catch (error) {
        console.error('Error in getChirpById:', error);
        throw error;
    }
};

const createChirp = async (userId, text, location) => {
    const result = await db.query('INSERT INTO chirps (user_id, body, location) VALUES (?, ?, ?)', [userId, text, location]);
    return result;
};

const updateChirp = async (chirpId, newText) => {
    const result = await db.query('UPDATE chirps SET body = ? WHERE id = ?', [newText, chirpId]);
    return result;
};

const deleteChirp = async (chirpId) => {
    const result = await db.query('DELETE FROM chirps WHERE id = ?', [chirpId]);
    return result;
};

module.exports = {
    getAllChirps,
    getChirpById,
    createChirp,
    updateChirp,
    deleteChirp
};