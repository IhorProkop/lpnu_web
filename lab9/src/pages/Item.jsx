import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.jsx";
import { INITIAL_CATALOG_ITEMS } from "../data/catalogItems.js";

export default function Item() {
  const { id } = useParams();
  const { products } = useProducts();
  const navigate = useNavigate();

  const contextProduct = products.find((item) => item.id === id);

  const localProduct = INITIAL_CATALOG_ITEMS.find((item) => item.id === id);

  const product = (() => {
    const base = contextProduct || localProduct;

    if (!base) return null;

    return {
      ...base,
      image: localProduct?.image || base.image,
      alt: localProduct?.alt || base.alt || base.title,
    };
  })();

  if (!product) {
    return (
      <section className="page item-page">
        <div className="item-page__container">
          <p>Item not found</p>
          <button onClick={() => navigate("/catalog")}>Back to catalog</button>
        </div>
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
            <p className="item-page__description">{product.description}</p>

            <div className="item-page__fields">
              <div className="field">
                <label>Countable field</label>
                <input type="number" defaultValue={1} />
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
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
