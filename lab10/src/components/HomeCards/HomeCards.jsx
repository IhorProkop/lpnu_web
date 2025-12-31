import { useState } from "react";
import PrimaryButton from "../Button/PrimaryButton";

import pasta from "../../assets/images/HomePageCards/pasta.jpg";
import fruits from "../../assets/images/HomePageCards/fruits.jpg";
import honeyCheese from "../../assets/images/HomePageCards/honey-cheese.jpg";

const cards = [
  {
    id: 1,
    title: "Dinner Tonight",
    description:
      "Ready recipe kits in 20 minutes: pasta, salad, chicken & veggies.",
    image: pasta,
    alt: "Spaghetti topped with tomato-basil sauce in a white bowl.",
  },
  {
    id: 2,
    title: "-25% Fruit of the Week",
    description: "Strawberries, bananas, kiwis — while in season!",
    image: fruits,
    alt: "Vibrant mix of tropical fruits—dragon fruit, papaya, durian, kumquats.",
  },
  {
    id: 3,
    title: "Local Producers",
    description: "Honey, cheeses, jams from nearby farms.",
    image: honeyCheese,
    alt: "Creamy brie with honey, almonds, and walnuts on rustic paper.",
  },
  {
    id: 4,
    title: "Late-night snacks",
    description: "Chips, chocolate and more for movie nights.",
    image: pasta,
    alt: "Bowl of snacks.",
  },
  {
    id: 5,
    title: "Weekly veggies box",
    description: "Seasonal vegetables from local farmers.",
    image: fruits,
    alt: "Fresh vegetables.",
  },
  {
    id: 6,
    title: "Breakfast essentials",
    description: "Milk, eggs, bread and cereals.",
    image: honeyCheese,
    alt: "Breakfast set.",
  },
];

export default function Cards() {
  const [visibleCount, setVisibleCount] = useState(3);

  const visibleCards = cards.slice(0, visibleCount);

  function handleLoadMore() {
    setVisibleCount((prev) => {
      const next = prev + 3;
      return next > cards.length ? cards.length : next;
    });
  }

  const canLoadMore = visibleCount < cards.length;

  return (
    <section className="offer-cards">
      <div className="offer-cards__container">
        <div className="offer-cards__wrapper">
          {visibleCards.map((card) => (
            <article key={card.id} className="offer-card">
              <div className="offer-card__img">
                <img src={card.image} alt={card.alt} />
              </div>
              <div className="offer-card__content">
                <h2 className="offer-card__title title">{card.title}</h2>
                <div className="offer-card__description">
                  {card.description}
                </div>
              </div>
            </article>
          ))}
        </div>

        {canLoadMore && (
          <PrimaryButton text="Load more" onClick={handleLoadMore} />
        )}
      </div>
    </section>
  );
}
