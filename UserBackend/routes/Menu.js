

// import aloo from "../modals/aloo.js";
// import pavbhaji from "../modals/pavbhaji.js";
// import butter from "../modals/butterpaneermasala.js";
// import express from "express";
// import coldcoffee from "../modals/coldcoffee.js";
// import dalmakhni from "../modals/dalmakhni.js";
// import idli from "../modals/idli.js";
// import masaladosa from "../modals/masaladosa.js";
// import paneerparatha from "../modals/paneerparatha.js";
// import vegbiryani from "../modals/vegbiryani.js";
// import vegsandwich from "../modals/vegsandwich.js";
// const route = express.Router();

// // API Endpoint
// route.get("/api/fetch-data", async (req, res) => {
//     const { collection, filter } = req.query; // Get query parameters
//     try {
//         let data = null;

//         // Logic to fetch data based on the collection parameter
//         if (collection === "aloo") {
//             data = await aloo.find(JSON.parse(filter || "{}")); // Apply filter if provided
//         } else if (collection === "pavbhaji") {
//             data = await pavbhaji.find(JSON.parse(filter || "{}")); // Apply filter if provided
//         } 
//         else if (collection === "butterpaneermasala") {
//           data = await butter.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "coldcoffee") {
//           data = await coldcoffee.find(JSON.parse(filter || "{}"));
//         }

//         else if (collection === "dalmakhni") {
//           data = await dalmakhni.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "idli") {
//           data = await idli.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "masaladosa") {
//           data = await masaladosa.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "paneerparatha") {
//           data = await paneerparatha.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "vegbiryani") {
//           data = await vegbiryani.find(JSON.parse(filter || "{}"));
//         }
//         else if (collection === "vegsandwich") {
//           data = await vegsandwich.find(JSON.parse(filter || "{}"));
//         }
        
//         else {
//             return res.status(400).json({ success: false, message: "Invalid collection name" });
//         }

//         res.json({
//             success: true,
//             data,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// export default route;

import express from "express";
// import Menu from "../modals/menu.js";
import exploreMenu from "../modals/exploreMenu.js";

const router = express.Router();

// API to fetch all menu items
router.get("/menu", async (req, res) => {
    try {
        const menuItems = await exploreMenu.find(); // Fetch all items
        res.status(200).json({
            success: true,
            data: menuItems,
        });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ success: false, message: "Failed to fetch menu items." });
    }
});

// API to fetch menu items by category


export default router;

