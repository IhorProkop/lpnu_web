import { Link } from "react-router-dom";
import Button from "../Button/PrimaryButton";

export default function CatalogCards({ items = [] }) {
  return (
    <section className="catalog-cards">
      <div className="catalog-cards__container">
        <div className="catalog-cards__wrapper">
          {items.map((item) => (
            <article key={item.id} className="catalog-card">
              <div className="catalog-card__img">
                <img src={item.image} alt={item.alt} />
              </div>

              <div className="catalog-card__content">
                <h2 className="catalog-card__title title">{item.title}</h2>
                <p className="catalog-card__description">{item.description}</p>

                <div className="catalog-card__price">
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </div>
              </div>

              <Link to={`/catalog/${item.id}`} className="catalog-card__btn">
                <Button text="View more" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
