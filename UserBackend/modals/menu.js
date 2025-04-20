import mongoose from "mongoose";

// Define the schema for the Menu collection
const menuSchema = new mongoose.Schema(
  {
    meal_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: false, // Optional field for the image
    },
    category: {
      type: String,
      required: false, // Optional field to categorize meals (e.g., "Vegetarian", "Non-Vegetarian", "Vegan")
    },
    ingredients: {
      type: [String], // Array of ingredients
      required: false, // Optional field
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// ✅ Enable full-text search for name, description, and ingredients
menuSchema.index({ name: "text", description: "text", ingredients: "text" });

// Create and export the model
const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
