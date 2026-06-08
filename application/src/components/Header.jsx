import { GithubIcon } from "./icons/GithubIcon.jsx";
import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:ml-56 lg:max-w-none lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">洪睦筌</h1>
            <p className="mt-1 text-lg text-primary-600">
              前端工程師 / Wehelp 申請者
            </p>
            <p className="mt-3 max-w-xl text-slate-600">
              目前為前端工程師，期許職涯朝向全端工程師發展；希望透過培訓營有系統地學習後端知識，整合為完整的全端開發能力。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/muchuanhung"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://strava-sync-alpha.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <ExternalLink className="h-4 w-4" />
              個人專案 Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
