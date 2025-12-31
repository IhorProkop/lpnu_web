import Header from "../components/Header/Header.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Cards from "../components/HomeCards/HomeCards.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Home() {

  return (
    <>
      <Header />

      <main className="page">
        <Hero />

        <Cards />
      </main>

      <Footer/>
    </>
  );
}
