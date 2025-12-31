import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Item from "./pages/Item.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Success from "./pages/Success.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import Footer from "./components/Footer/Footer.jsx";

export default function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <ProductsProvider>
      <div className="wrapper">
        <Header search={searchInput} onSearchChange={setSearchInput} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/catalog"
              element={<Catalog searchInput={searchInput} />}
            />
            <Route path="/catalog/:id" element={<Item />} />
            <Route path="/cart" element={<Cart />} />

            {/* NEW */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ProductsProvider>
  );
}
