const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/orders", require("./routes/orders"));

app.listen(4000, () => console.log("✅ Backend running on port 4000"));
app.get("/", (req, res) => {
  res.send("A1B Backend API is running");
});
