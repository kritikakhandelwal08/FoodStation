import express from "express";
import axios from "axios";
import Menu from "../modals/menu.js"; // Import Meal model

const router = express.Router();

router.post("/recommend", async (req, res) => {
  try {
    console.log("Received from frontend:", req.body);

    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "Missing user_id" });
    }

    const parsedUserId = parseInt(user_id, 10); // Ensure user_id is an integer

    // Step 1: Fetch recommendations from Flask API
    const response = await axios.post("http://127.0.0.1:5000/recommend", {
      user_id: parsedUserId,
    });

    console.log("Flask API Response:", response.data);

    const { recommendations } = response.data; // Extract recommended meal IDs

    if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
      return res.json({ meals: [] }); // No recommendations found
    }

    // Step 2: Fetch full meal details from MongoDB based on recommended IDs
    const meals = await Menu.find({ meal_id: { $in: recommendations } });

    res.json({ meals });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
