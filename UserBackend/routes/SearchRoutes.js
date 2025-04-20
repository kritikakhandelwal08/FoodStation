import express from "express";
import Menu from "../modals/menu.js";  // Food model
// import Chef from "../models/Chef.js"; // Home chef model

const router = express.Router();

// Search API
router.get("/", async (req, res) => {
    try {
        const { query, category, sortBy, page = 1, limit = 10 } = req.query;

        const searchQuery = query
            ? { $text: { $search: query } }  // MongoDB text search
            : {};

        if (category) searchQuery.category = category;

        const sortOptions = {};
        if (sortBy === "rating") sortOptions.rating = -1; // Sort by highest rating
        if (sortBy === "price") sortOptions.price = 1; // Sort by lowest price

        const foodItems = await Menu.find(searchQuery)
            .sort(sortOptions)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        res.json(foodItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
