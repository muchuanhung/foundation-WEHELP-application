const GITHUB_REPO =
  "https://github.com/muchuanhung/foundation-WEHELP-application";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[720px] border-t border-slate-200 px-5 py-6 pb-10 text-center text-sm text-slate-600">
      <p className="my-1">© 2025 MuChuan Hung</p>
      <p className="my-1">
        <a
          href={GITHUB_REPO}
          rel="noopener noreferrer"
          className="text-sky-700 no-underline hover:underline"
        >
          GitHub 原始碼
        </a>
      </p>
    </footer>
  );
}
