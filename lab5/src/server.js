import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import {
  listAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  removeAnimal,
} from "./animalsRepo.js";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/animals", async (req, res) => {
  const { search = "", sort = "" } = req.query;
  const animals = await listAnimals({ search, sort });
  res.json(animals);
});

app.get("/api/animals/:id", async (req, res) => {
  const animal = await getAnimal(req.params.id);
  if (!animal) return res.status(404).json({ error: "Not found" });
  res.json(animal);
});

app.post("/api/animals", async (req, res) => {
  const newAnimal = await createAnimal(req.body);
  res.status(201).json(newAnimal);
});

app.put("/api/animals/:id", async (req, res) => {
  const updated = await updateAnimal(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

app.delete("/api/animals/:id", async (req, res) => {
  const removed = await removeAnimal(req.params.id);
  if (!removed) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
