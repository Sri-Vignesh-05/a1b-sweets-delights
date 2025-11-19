const express = require("express");
const router = express.Router();
const client = require("../db");

router.post("/", async (req, res) => {
  try {
    const db = client.db("a1b_store");

    await db.collection("orders").insertOne(req.body);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
