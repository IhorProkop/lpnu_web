import Button from "../Button/PrimaryButton";

import Coke from "../../assets/images/CatalogCards/Coke.jpg";
import NutellaImg from "../../assets/images/CatalogCards/Nutella.jpg";
import PeanutButterImg from "../../assets/images/CatalogCards/Peanut_butter.jpg";
import BurnImg from "../../assets/images/CatalogCards/Burn.jpg";

export const catalogItems = [
  {
    id: "coca-cola-330",
    title: "Coca-Cola 330 ml",
    description: "Classic cola taste the world knows. Best served chilled.",
    price: 1.49,
    image: Coke,
    alt: "Red 330 ml can of Coca-Cola",
  },
  {
    id: "nutella-350",
    title: "Nutella 350 g",
    description:
      "Hazelnut cocoa spread, smooth and creamy. Perfect for pancakes and toast.",
    price: 5.99,
    image: NutellaImg,
    alt: "Jar of Nutella hazelnut cocoa spread, 350 g",
  },
  {
    id: "peanut-butter-340",
    title: "Peanut Butter 340 g",
    description:
      "Classic creamy peanut butter with no palm oil. Great for sandwiches and smoothies.",
    price: 3.79,
    image: PeanutButterImg,
    alt: "Jar of smooth peanut butter, 340 g",
  },
  {
    id: "burn-500",
    title: "Burn 500 ml",
    description:
      "Energy drink with a bold flavor and caffeine kick to power your day.",
    price: 2.19,
    image: BurnImg,
    alt: "Black and green 500 ml can of Burn energy drink",
  },
];

export default function CatalogCards() {
  return (
    <section className="catalog-cards">
      <div className="catalog-cards__container">
        <div className="catalog-cards__wrapper">
          {catalogItems.map((item) => (
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

              <Button text="Load more" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
