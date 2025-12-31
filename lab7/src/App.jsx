import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog" element={<Catalog />}></Route>
      </Routes>
    </>
  );
}
