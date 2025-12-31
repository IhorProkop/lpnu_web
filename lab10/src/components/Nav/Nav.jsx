import {Link} from 'react-router-dom';

export default function Nav({nav = []}) {
    return (
      <nav className="header__menu menu" aria-label="main navigation">
        <ul className="menu__list">
          {nav.map((item) => (
            <li key={item.id} className="menu__item">
              <Link to={item.href} className="menu__link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
}