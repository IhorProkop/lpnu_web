import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../store/cartActions";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Button/PrimaryButton";

export default function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section className="page cart-page">
        <div className="cart-page__container">
          <h1 className="cart-page__title">Shopping Cart</h1>

          <p className="cart-page__empty">Your cart is empty.</p>

          <PrimaryButton
            text="Back to Catalog"
            onClick={() => navigate("/catalog")}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="page cart-page">
      <div className="cart-page__container">
        <h1 className="cart-page__title">Shopping Cart</h1>

        <div className="cart-page__list">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <div className="cart-item__image">
                {item.image ? (
                  <img src={item.image} alt={item.alt || item.title} />
                ) : (
                  <div className="cart-item__image-placeholder" />
                )}
              </div>

              <div className="cart-item__body">
                <h2 className="cart-item__title">{item.title}</h2>

                <div className="cart-item__bottom-row">
                  <div className="cart-item__counter">
                    <button
                      type="button"
                      className="cart-item__qty-btn cart-item__qty-btn--minus"
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      –
                    </button>

                    <span className="cart-item__qty-value">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      className="cart-item__qty-btn cart-item__qty-btn--plus"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item__price">
                    ${ (item.price * item.quantity).toFixed(2) }
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="cart-item__remove"
                aria-label="Remove item from cart"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                ×
              </button>
            </article>
          ))}
        </div>

        <div className="cart-page__summary">
          <p className="cart-page__total">
            Total amount: <strong>${totalAmount.toFixed(2)}</strong>
          </p>

          <div className="cart-page__actions">
            <PrimaryButton
              text="Back to Catalog"
              onClick={() => navigate("/catalog")}
            />
            <PrimaryButton text="Continue" />
          </div>
        </div>
      </div>
    </section>
  );
}
