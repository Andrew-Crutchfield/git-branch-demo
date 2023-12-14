import Query from "../db";
import { Blog } from "../../types";

const getAll = () => Query<Blog[]>("SELECT * FROM Blogs");

const getOne = (id: number) => Query<Blog[]>("SELECT * FROM Blogs WHERE id=?", [id]);

const create = (userId: number, text: string, location: string) =>
    Query("INSERT INTO Blogs (userId, text, location) VALUES (?, ?, ?)", [userId, text, location]);

const destroy = (id: number) => Query("DELETE FROM Blogs WHERE id = ?", [id]);

const update = (userId: number, text: string, location: string, id: number) =>
    Query("UPDATE Blogs SET userId = ?, text = ?, location = ? WHERE id = ?", [userId, text, location, id]);

export default {
    getAll,
    getOne,
    create,
    destroy,
    update,
};
