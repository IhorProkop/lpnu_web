import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/Button/PrimaryButton";
import "../styles/Success.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <section className="page success-page">
      <div className="success-page__container">
        <div className="success-card">
          <div className="success-card__icon" aria-hidden="true">
            <span className="success-card__check">✓</span>
          </div>

          <h1 className="success-card__title">Success!</h1>

          <p className="success-card__text">
            Your order was sent to processing!
            <br />
            Check your email box for further information.
          </p>

          <PrimaryButton
            text="Go back to Catalog"
            className="btn--primary"
            onClick={() => navigate("/catalog")}
          />
        </div>
      </div>
    </section>
  );
}
