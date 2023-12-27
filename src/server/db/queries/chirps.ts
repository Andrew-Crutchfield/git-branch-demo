import { Chirp } from '../../types';
import Query from '../db';

const getAll = () => Query<Chirp[]>('SELECT * FROM chirps');

const getOne = (id: number) => Query<Chirp[]>('SELECT * FROM chirps WHERE id = ?', [id]);

const create = (user_id: number, body: string, location: string) =>
  Query('INSERT INTO chirps (user_id, body, location) VALUES (?, ?, ?)', [user_id, body, location]);

const destroy = (id: number) => Query('DELETE FROM chirps WHERE id = ?', [id]);

export const getMentionsForUser = (userId: number) =>
  Query<Chirp[]>('SELECT c.* FROM chirps c JOIN mentions m ON m.chirp_id = c.id WHERE m.user_id = ?', [userId]);

const update = (user_id: number, body: string, location: string, id: number) =>
  Query('UPDATE chirps SET user_id = ?, body = ?, location = ? WHERE id = ?', [user_id, body, location, id]);

export default {
  getAll,
  getOne,
  create,
  destroy,
  getMentionsForUser,
  update,
};