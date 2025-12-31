import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import CatalogCards from "../components/CatalogCards/CatalogCards.jsx";
import FilterBar from "../components/FilterBar/FilterBar.jsx";

export default function Catalog() {

  return (
    <>
      <Header />

      <main>
        <FilterBar />

        <CatalogCards />
      </main>

      <Footer />
    </>
  );
}
