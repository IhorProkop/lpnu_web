import Hero from "../components/Hero/Hero.jsx";
import Cards from "../components/HomeCards/HomeCards.jsx";

export default function Home() {
  return (
    <main className="page">
      <Hero />

      <section className="page home-page">
        <Cards />
      </section>
    </main>
  );
}
