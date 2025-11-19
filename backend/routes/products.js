const express = require("express");
const router = express.Router();
const client = require("../db");

router.get("/", async (req, res) => {
  try {
    const db = client.db("a1b_store");
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
