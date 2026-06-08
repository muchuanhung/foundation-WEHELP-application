import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
      <header className="box-border w-full border-b border-slate-200 bg-header">
        <div className="mx-auto box-border flex h-14 w-[90%] max-w-content items-center justify-between px-0 desktop:h-16 desktop:w-full">
          <h1 className="m-0 font-serif text-xl font-normal">My Website</h1>

          <nav
            className="hidden items-center gap-8 tablet:flex"
            aria-label="主選單"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-base text-black no-underline"
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="box-border flex h-10 w-10 items-center justify-center border-0 bg-transparent p-0 tablet:hidden"
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 border-0 bg-black/30 p-0 tablet:hidden"
          aria-label="關閉選單背景"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 box-border w-[55%] max-w-xs bg-white p-6 shadow-lg transition-transform duration-300 tablet:hidden ${
          menuOpen
            ? "translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            className="box-border border-0 bg-transparent p-0"
            aria-label="關閉選單"
            onClick={() => setMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-8" aria-label="手機選單">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-lg text-black no-underline"
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
