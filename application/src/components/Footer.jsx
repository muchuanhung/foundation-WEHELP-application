import { Heart } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon.jsx";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:ml-56 lg:max-w-none lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1 text-sm text-slate-500">
            Made with <Heart className="h-4 w-4 text-red-500" /> for WeHelp
            Bootcamp
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/muchuanhung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 transition-colors hover:text-slate-700"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <span className="text-sm text-slate-400">
              &copy; 2026 洪睦筌
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
