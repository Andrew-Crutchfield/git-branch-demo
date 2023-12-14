import express from "express";
import db_blogs from "../db/queries/blogs";

const blogsRouter = express.Router();

interface IBlogData {
    userId: number;
    text: string;
}

function validateBlogPost(blogData: IBlogData) {
    return !blogData.userId || !blogData.text ? "userId and text are required fields" : null;
}

blogsRouter.get("/", async (req, res) => {
    try {
        const blogPosts = await db_blogs.getAll();
        res.status(200).json({ data: blogPosts });
    } catch (error) {
        console.error("Error getting blog posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

blogsRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [blog] = await db_blogs.getOne(id);
        res.status(200).json({ data: blog });
    } catch (error) {
        console.error("Error getting blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

blogsRouter.post("/", async (req, res) => {
    try {
        const validationError = validateBlogPost(req.body);
        if (validationError) {
            return res.status(400).json({ message: "Validation failed", error: validationError });
        }

        const result = await db_blogs.create(req.body.userId, req.body.text, req.body.location || null);

        const [savedBlogPost] = await db_blogs.getOne(result.insertId);

        res.status(201).json({ message: "Blog post created", data: savedBlogPost });
    } catch (error) {
        console.error("Error creating blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

blogsRouter.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db_blogs.destroy(id);
        res.status(200).json({ message: "Blog post deleted" });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

blogsRouter.put("/:id", async (req, res) => {
    try {
        const validationError = validateBlogPost(req.body);
        if (validationError) {
            return res.status(400).json({ message: "Validation failed", error: validationError });
        }

        const id = Number(req.params.id);
        await db_blogs.update(req.body.userId, req.body.text, req.body.location || null, id);

        res.status(200).json({ message: "Blog post updated" });
    } catch (error) {
        console.error("Error updating blog post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default blogsRouter;
