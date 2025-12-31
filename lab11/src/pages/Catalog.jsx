import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar/FilterBar.jsx";
import CatalogCards from "../components/CatalogCards/CatalogCards.jsx";
import Loader from "../components/Loader/Loader.jsx";
import { fetchProducts } from "../api/productsApi.js";
import { INITIAL_CATALOG_ITEMS } from "../data/catalogItems.js";

export default function Catalog({ searchInput = "" }) {
  const [draftType, setDraftType] = useState("all");
  const [draftSize, setDraftSize] = useState("all");
  const [draftSort, setDraftSort] = useState("none");

  const [typeFilter, setTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchFilter, setSearchFilter] = useState("");

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleApplyFilters() {
    setTypeFilter(draftType);
    setSizeFilter(draftSize);
    setSortOrder(draftSort);
    setSearchFilter(searchInput);
  }

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const apiProducts = await fetchProducts({
          type: typeFilter,
          size: sizeFilter,
          sort: sortOrder,
        });

        const withImages = apiProducts.map((p) => {
          const local = INITIAL_CATALOG_ITEMS.find((item) => item.id === p.id);

          if (!local) return p;

          return {
            ...p,
            image: local.image,
            alt: local.alt,
          };
        });

        const searched = withImages.filter((item) => {
          if (!searchFilter.trim()) return true;
          const text = (item.title + " " + item.description).toLowerCase();
          return text.includes(searchFilter.toLowerCase());
        });

        setProducts(searched);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [typeFilter, sizeFilter, sortOrder, searchFilter]);

  return (
    <section className="page catalog-page">
      <FilterBar
        type={draftType}
        onTypeChange={setDraftType}
        size={draftSize}
        onSizeChange={setDraftSize}
        sort={draftSort}
        onSortChange={setDraftSort}
        onApply={handleApplyFilters}
      />

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {!isLoading && !error && <CatalogCards items={products} />}
    </section>
  );
}
