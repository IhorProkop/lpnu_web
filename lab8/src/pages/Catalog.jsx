// src/pages/Catalog.jsx
import { useState } from "react";
import { useProducts } from "../context/ProductsContext.jsx";
import FilterBar from "../components/FilterBar/FilterBar.jsx";
import CatalogCards from "../components/CatalogCards/CatalogCards.jsx";

export default function Catalog({ searchInput = "" }) {
  const { products } = useProducts();

  const [draftType, setDraftType] = useState("all");
  const [draftSize, setDraftSize] = useState("all");
  const [draftSort, setDraftSort] = useState("none");

  const [typeFilter, setTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchFilter, setSearchFilter] = useState("");

  function handleApplyFilters() {
    setTypeFilter(draftType);
    setSizeFilter(draftSize);
    setSortOrder(draftSort);

    setSearchFilter(searchInput);
  }

  const filtered = [...products]
    .filter((item) => {
      if (typeFilter === "all") return true;
      return item.type === typeFilter;
    })
    .filter((item) => {
      if (sizeFilter === "all") return true;
      return item.size === sizeFilter;
    })
    .filter((item) => {
      if (!searchFilter || !searchFilter.trim()) return true;
      const text = (item.title + " " + item.description).toLowerCase();
      return text.includes(searchFilter.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return 0;
    });

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

      <CatalogCards items={filtered} />
    </section>
  );
}
