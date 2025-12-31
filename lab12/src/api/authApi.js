import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export async function registerUser(payload) {
  const res = await api.post("/register", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await api.post("/login", payload);
  return res.data;
}
