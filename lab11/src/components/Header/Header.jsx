import { useLocation, matchPath } from "react-router-dom";
import siteLogo from "../../assets/icons/react.svg";
import Nav from "../Nav/Nav";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";

export default function Header({ search, onSearchChange }) {
  const nav = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Catalog", href: "/catalog" },
    { id: 3, label: "Cart", href: "/cart" },
  ];

  const location = useLocation();
  const onCatalog = matchPath("/catalog/", location.pathname);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={siteLogo} alt="web site logo" />
        </div>

        <Nav nav={nav} />

        {onCatalog && (
          <div className="header__search">
            <SearchInput
              placeholder="Search in catalog…"
              value={search}
              onChange={onSearchChange}
            />
          </div>
        )}
      </div>
    </header>
  );
}
