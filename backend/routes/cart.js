const express = require("express");
const router = express.Router();
const client = require("../db");

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const db = client.db("a1b_store");

    await db.collection("cart").insertOne({
      userId,
      productId,
      quantity
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const db = client.db("a1b_store");
    const items = await db
      .collection("cart")
      .find({ userId: req.params.userId })
      .toArray();

    res.json(items);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
