// import menu from '../modals/menu'
// const Menu = require('../models/menu');

// // Create a menu item
// exports.createMenuItem = async (req, res) => {
//   const { foodName, price, category, description } = req.body;
//   try {
//     const menuItem = new Menu({ foodName, price, category, description });
//     await menuItem.save();
//     res.status(201).json(menuItem);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating menu item' });
//   }
// };

// // Get all menu items
// exports.getMenuItems = async (req, res) => {
//   try {
//     const menuItems = await Menu.find().populate('category');
//     res.status(200).json(menuItems);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching menu items' });
//   }
// };
