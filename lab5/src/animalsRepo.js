
import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const DB_PATH = path.resolve('db', 'animals.json');

const TYPE_TO_IMG = {
  cat: 'img/cat.jpg',
  dog: 'img/dog.jpg',
  parrot: 'img/parrot.jpg',
  hamster: 'img/hamster.jpg',
  turtle: 'img/turtle.jpg'
};

async function ensureDb() {
  try { await fs.access(DB_PATH); }
  catch {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, '[]', 'utf-8');
  }
}

async function readAll() {
  await ensureDb();
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  try { return JSON.parse(raw); }
  catch { await fs.writeFile(DB_PATH, '[]'); return []; }
}

async function writeAll(items) {
  await fs.writeFile(DB_PATH, JSON.stringify(items, null, 2), 'utf-8');
}

export async function listAnimals({ search = '', sort = '' } = {}) {
  let animals = await readAll();
  if (search) {
    const q = search.toLowerCase();
    animals = animals.filter(a => (a.title || '').toLowerCase().includes(q));
  }
  if (sort === 'expensive') {
    animals.sort((a, b) => (Number(b.expense) || 0) - (Number(a.expense) || 0));
  }
  return animals;
}

export async function getAnimal(id) {
  const animals = await readAll();
  return animals.find(a => a.id === id) ?? null;
}

export async function createAnimal(data) {
  const now = new Date().toISOString();
  const expense = Number(data.expense);
  const animal = {
    id: nanoid(8),
    title: String(data.title ?? '').trim() || 'Untitled',
    description: String(data.description ?? '').trim(),
    expense: Number.isFinite(expense) ? expense : 0,
    type: String(data.type ?? '').trim(),
    img: TYPE_TO_IMG[String(data.type ?? '').trim()] || 'img/default.png',
    createdAt: now,
    updatedAt: now
  };
  const animals = await readAll();
  animals.unshift(animal);
  await writeAll(animals);
  return animal;
}

export async function updateAnimal(id, data) {
  const animals = await readAll();
  const idx = animals.findIndex(a => a.id === id);
  if (idx === -1) return null;
  const prev = animals[idx];
  const expense = data.expense !== undefined ? Number(data.expense) : prev.expense;
  const updated = {
    ...prev,
    ...data,
    title: data.title !== undefined ? String(data.title).trim() : prev.title,
    description: data.description !== undefined ? String(data.description).trim() : prev.description,
    expense: Number.isFinite(expense) ? expense : prev.expense,
    type: data.type !== undefined ? String(data.type).trim() : prev.type,
    img: data.type !== undefined ? (TYPE_TO_IMG[String(data.type).trim()] || prev.img) : prev.img,
    updatedAt: new Date().toISOString()
  };
  animals[idx] = updated;
  await writeAll(animals);
  return updated;
}

export async function removeAnimal(id) {
  const animals = await readAll();
  const idx = animals.findIndex(a => a.id === id);
  if (idx === -1) return false;
  animals.splice(idx, 1);
  await writeAll(animals);
  return true;
}
