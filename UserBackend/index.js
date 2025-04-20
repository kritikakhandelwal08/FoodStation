import express from "express";
import cors from "cors";
import Food from "./routes/Food.js";
import connectDB from "./db/connection.js";
import Menu from "./routes/Menu.js";
import Recommend from "./routes/Recommend.js";
import bodyParser from "body-parser";
import Category from "./routes/Category.js"
import profile from "./routes/profile.js"
import Cart from "./routes/Cart.js"
import userRoutes from "./routes/userRoutes.js";
import kitchenRoutes from "./routes/kitchenRoutes.js"
import SearchRoutes from "./routes/SearchRoutes.js"
// Config
const app = express();
const port = 8000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json()); // Body parser middleware (built into Express 4.16+)
app.use(cors({ origin: "*" })); // CORS middleware to allow cross-origin requests

// API Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Food and Menu Routes
app.use("/foods", Food);
app.use("/api", Menu);  // Corrected this to use Menu for `/exploreMenu` route
app.use("/meals", Food);
app.use("/tiffinzones", Food);
app.use("/api/category", Category)
// Recommendation Route
app.use("/api", Recommend);
app.use("/api/auth",profile)
//Search route
app.use("/api/search", SearchRoutes)
// User Routes
app.use("/api/users", userRoutes); // User route for login/register, etc.
app.use("/api/kitchen", kitchenRoutes)
app.use("/api/cart",Cart)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
