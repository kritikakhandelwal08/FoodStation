import express from "express";

import food from "../modals/food.js";
import exploreMenu from "../modals/exploreMenu.js";
import homeMade from "../modals/homeMade.js";
import tiffinzone from "../modals/tiffinzone.js";
// import aloo from "../modals/aloo.js";

const router = express.Router();

// ___________________________ GET API DATA ___________________________
router.get("/all", async (req, res) => {
  const foodData = await food.find();
  res.status(200);
  res.send(foodData);
});

router.get("/Menu", async (req, res) => {
  const menuData = await exploreMenu.find();
  res.status(200);
  res.send(menuData);
});

router.get("/homemade", async (req, res) => {
  const homemadeData = await homeMade.find();

  res.status(200);
  res.send(homemadeData);
});

router.get("/tiffinzone", async (req, res) => {
  const tiffinData = await tiffinzone.find();
  res.status(200);
  res.send(tiffinData);
});

// router.get("/alooparatha", async (req, res) => {
//   const alooData = await aloo.find();

//   res.status(200);
//   res.send(alooData);
// });





export default router;
