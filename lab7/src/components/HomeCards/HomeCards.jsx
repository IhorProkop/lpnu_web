import Button from "../Button/PrimaryButton";

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
];

export default function Cards() {
  return (
    <section className="offer-cards">
      <div className="offer-cards__container">
        <div className="offer-cards__wrapper">
          {cards.map((card) => (
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

        <Button text="Load more" />
      </div>
    </section>
  );
}
