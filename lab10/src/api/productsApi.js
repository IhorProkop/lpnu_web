import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export async function fetchProducts(params = {}) {
  const res = await api.get("/products", { params });
  return res.data;
}

export async function fetchProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}
