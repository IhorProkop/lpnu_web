import XIcon from "../../assets/icons/X.svg";
import LinkedInIcon from "../../assets/icons/LinkedIn.svg";
import InstagramIcon from "../../assets/icons/Instagram.svg";
import ReactIcon from "../../assets/icons/react.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__title title">Branding stuff</h3>

            <p className="footer__description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            </p>
          </div>

          <div className="footer__logo">
            <img src={ReactIcon} alt="react logo" />
          </div>

          <ul className="footer__social" aria-label="Social links">

            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
                <img src={XIcon} alt="X logo" />
              </a>
            </li>

            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
                <img src={LinkedInIcon} alt="LinkedIn logo" />
              </a>
            </li>

            <li className="footer__social-item">
              <a href="#" className="footer__social-link">
                <img src={InstagramIcon} alt="Instagram logo" />
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <small className="footer__copyright">
            2025 Ihor Prokop © Copyright all rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
