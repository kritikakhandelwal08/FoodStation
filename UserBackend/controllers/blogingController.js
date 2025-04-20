// import bloging from "../modals/bloging"
// const Bloging = require('../models/bloging');

// // Create a blog item (e.g., food, meal, exploremenus, etc.)
// exports.createBloging = async (req, res) => {
//   const { name, type, description } = req.body;
//   try {
//     const bloging = new Bloging({ name, type, description });
//     await bloging.save();
//     res.status(201).json(bloging);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating bloging item' });
//   }
// };

// // Get all blog items
// exports.getBlogings = async (req, res) => {
//   try {
//     const blogings = await Bloging.find();
//     res.status(200).json(blogings);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching bloging items' });
//   }
// };
