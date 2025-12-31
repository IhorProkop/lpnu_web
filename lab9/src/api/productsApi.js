import axios from "axios";

const API_URL = "http://localhost:4000/api";

export async function fetchProducts(params = {}) {
  const response = await axios.get(`${API_URL}/products`, {
    params,
  });
  return response.data;
}

export async function fetchProductById(id) {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
}
