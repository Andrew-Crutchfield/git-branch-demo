import express from "express";
import db from "../db/queries/chirps"; // Import the database query functions

const router = express.Router();


// Route to get all chirps
router.get("/", async (req, res) => {
    try {
        const chirps = await db.getAll();
        res.status(200).json(chirps);
    } catch (error) {
        console.error("Error getting chirps:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to get a single chirp by id
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const chirp = await db.getOne(id);
        res.status(200).json(chirp);
    } catch (error) {
        console.error("Error getting chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to create a new chirp
router.post("/", async (req, res) => {
    try {
        const { user_id, body, location } = req.body;
        const result = await db.create(user_id, body, location);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to delete a chirp
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db.destroy(id);
        res.status(200).json({ message: "Chirp deleted successfully" });
    } catch (error) {
        console.error("Error deleting chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to update a chirp
router.put("/:id", async (req, res) => {
    try {
        const { user_id, body, location } = req.body;
        const id = Number(req.params.id);
        await db.update(user_id, body, location, id);
        res.status(200).json({ message: "Chirp updated successfully" });
    } catch (error) {
        console.error("Error updating chirp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/mentions/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "User ID must be a number" });
    }

    try {
        const mentionedChirps = await db.getMentionsForUser(userId);
        res.status(200).json(mentionedChirps);
    } catch (error) {
        console.error("Error getting mentions:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;