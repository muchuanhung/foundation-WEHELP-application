import { useEffect, useState } from "react";
import { icons } from "../assets/icons.js";

const navItems = ["Item 1", "Item 2", "Item 3", "Item 4"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    {/* Header */}
      <header className="header">
        <div className="header__inner">
          <h1 className="header__title">My Website</h1>
          <nav className="header__nav" aria-label="主選單">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="header__nav-link"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="header__menu-btn"
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <img
              src={menuOpen ? icons.close : icons.menu}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`side-menu-overlay${menuOpen ? " side-menu-overlay--visible" : ""}`}
        aria-label="關閉選單背景"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`side-menu${menuOpen ? " side-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="side-menu__close">
          <button
            type="button"
            aria-label="關閉選單"
            onClick={() => setMenuOpen(false)}
          >
            <img src={icons.close} alt="" aria-hidden="true" />
          </button>
        </div>

        <nav className="side-menu__nav" aria-label="手機選單">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="side-menu__link"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
