import express from 'express';
import Menu from '../modals/menu.js';

const router = express.Router();

/**
 * @route   GET /category/:category
 * @desc    Fetch food items by category
 * @param   category - The category of food (e.g., Breakfast, Lunch, Dinner)
 * @access  Public
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    //  console.log(category)
    // Find all food items that match the category (case insensitive)
    const foods = await Menu.find({ category: { $regex: new RegExp(category) } });
    // const foods = await Menu.find({ category: category});

    // Check if any food items are found
    if (foods.length === 0) {
      return res.status(404).json({ message: `No food items found in the "${category}" category.` });
    }

    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching food by category:', error.message);
    res.status(500).json({ error: 'Server error. Unable to fetch food items.' });
  }
});

export default router;
