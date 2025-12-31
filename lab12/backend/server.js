const express = require("express");
const cors = require("cors");
const path = require("path");
const products = require("./data/catalogItems");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Missing fields (username, email, password) for registration",
    });
  }

  return res.json({
    ok: true,
    email,
    message: "Registered successfully (mock)",
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing fields (email, password) for login",
    });
  }

  return res.json({
    ok: true,
    email,
    message: "Logged in successfully (mock)",
  });
});

app.get("/api/products", (req, res) => {
  const { type, size, sort } = req.query;

  let result = [...products];

  if (type && type !== "all") {
    result = result.filter((p) => p.type === type);
  }

  if (size && size !== "all") {
    result = result.filter((p) => p.size === size);
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
