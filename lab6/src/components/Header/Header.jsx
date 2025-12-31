import siteLogo from "../../assets/icons/react.svg";
import Nav from "../Nav/Nav";

export default function Header() {
  const nav = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Catalog", href: "/catalog" },
    { id: 3, label: "Cart", href: "/cart" },
  ];


  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={siteLogo} alt="web site logo" />
        </div>

        <Nav nav={nav} />
      </div>
    </header>
  );
}
