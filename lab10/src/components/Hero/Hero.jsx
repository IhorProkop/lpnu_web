import HeroImage from "../../assets/images/HomePageHero/GroceryBasket.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__img">
          <img src={HeroImage} alt="grocery basket with products" />
        </div>

        <div className="hero__content">
          <h1 className="hero__title title">
            Groceries delivered in 60 minutes
          </h1>

          <div className="hero__description">
            Fresh fruit, dairy, bread and 2,000+ more items. Order online — we
            deliver from the nearest store.
          </div>
        </div>
      </div>
    </section>
  );
}
