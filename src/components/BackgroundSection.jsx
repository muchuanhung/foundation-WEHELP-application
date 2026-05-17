import { Briefcase, GraduationCap, Award } from "lucide-react";

export function BackgroundSection() {
  return (
    <section id="background" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Briefcase className="h-5 w-5 text-primary-600" />
          職業與學歷背景
        </h2>

        <div className="mt-6 space-y-6">
          {/* Professional Background */}
          <div>
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
              職業背景
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                前端工程師
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-slate-600">
              目前以 React 與
              React Native 為主要技術棧，實務涵蓋 UI/UX、CI/CD、自動化部署與跨平台 App
              開發，並具備 CSR、SSR、PWA、SEO 與無障礙（a11y）等實作經驗。
            </p>
          </div>

          {/* Education Background */}
          <div>
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <GraduationCap className="h-4 w-4 text-primary-600" />
              學歷背景
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                Vancouver Film School
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
                3D Animation & Visual Effects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
