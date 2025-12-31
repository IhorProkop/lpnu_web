// src/pages/Item.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchProductById } from "../api/productsApi";
import { addToCart } from "../store/cartActions";

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    const qty = Number(quantity) || 1;
    dispatch(addToCart(product, qty));
    navigate("/cart");
  }

  if (loading) {
    return (
      <section className="page">
        <p>Loading item…</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page">
        <p>Item not found</p>
        <button onClick={() => navigate("/catalog")}>
          Back to catalog
        </button>
      </section>
    );
  }

  return (
    <section className="page item-page">
      <div className="item-page__container">
        <div className="item-page__layout">
          <div className="item-page__image">
            <img src={product.image} alt={product.alt} />
          </div>

          <div className="item-page__content">
            <div className="item-page__tags">
              <span className="tag">1 characteristic</span>
              <span className="tag tag--active">2 characteristic</span>
            </div>

            <h1 className="item-page__title">{product.title}</h1>
            <p className="item-page__description">
              {product.description}
            </p>

            <div className="item-page__fields">
              <div className="field">
                <label>Countable field</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Selectable field</label>
                <select>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            <p className="item-page__price">
              Price: ${product.price.toFixed(2)}
            </p>

            <div className="item-page__buttons">
              <button onClick={() => navigate(-1)}>Go back</button>
              <button onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
