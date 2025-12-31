import { useLocation, matchPath, useNavigate } from "react-router-dom";
import siteLogo from "../../assets/icons/react.svg";
import Nav from "../Nav/Nav";
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import { isAuthed, clearAuth } from "../../utils/auth";

export default function Header({ search, onSearchChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authed = isAuthed();

  const nav = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Catalog", href: "/catalog" },
    { id: 3, label: "Cart", href: "/cart" },
  ];

  const onCatalog = matchPath("/catalog", location.pathname);

  function handleSignOut() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <header className="header">
      <div className="header__container">
        <div
          className="header__logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(authed ? "/" : "/login")}
        >
          <img src={siteLogo} alt="web site logo" />
        </div>

        {authed && <Nav nav={nav} />}

        {authed && onCatalog && (
          <div className="header__search">
            <SearchInput
              placeholder="Search in catalog…"
              value={search}
              onChange={onSearchChange}
            />
          </div>
        )}

        {authed && (
          <div className="header__auth">
            <PrimaryButton
              text="Sign me out"
              type="button"
              className="btn--outline"
              onClick={handleSignOut}
            />
          </div>
        )}
      </div>
    </header>
  );
}
