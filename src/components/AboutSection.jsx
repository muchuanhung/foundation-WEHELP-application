import { User, Target } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <User className="h-5 w-5 text-primary-600" />
          個人簡介和申請動機
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
              關於我
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600">
              我以前從事 3D 視覺特效；因疫情返台後，參與Alpha Camp前端課程，轉職為前端工程師。
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium text-slate-800">
              <Target className="h-4 w-4 text-primary-600" />
              申請動機
            </h3>
            <p className="mt-3 leading-relaxed text-slate-600">
            過去因為非科系背景，我的技術多是因應公司專案「做中學」累積而來，雖然具備了前端的開發能力，但缺乏系統性的引導。
            我希望透過這個高強度的全端技術訓練營，精進並補強後端技術與核心知識。結合我既有的前端實作經驗，將點狀的技能串聯為面，從而實現我的職涯轉型目標，成為能獨立解決問題的工程師。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
