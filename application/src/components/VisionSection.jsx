import { Code2, Lightbulb } from "lucide-react";

export function VisionSection() {
  return (
    <section id="vision" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Code2 className="h-5 w-5 text-primary-600" />
          開發技術心得
        </h2>

        <div className="mt-6">
          <div className="flex items-start gap-4 rounded-lg bg-gradient-to-r from-primary-50 to-slate-50 p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
              <Lightbulb className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">關於前端技術</h3>
              <ul className="mt-2 list-disc space-y-3 pl-5 leading-relaxed text-slate-600">
                <li>
                  <span className="font-medium text-slate-800">架構選型思維：</span>
                  我能依據專案特性靈活切換渲染策略。面對路由定量且可控的靜態網頁，我會採用
                  Next.js 搭配 SSG（靜態生成）以極大化 SEO 與首屏加載速度；而面對高度動態增量的複雜路由，則切換至
                  CSR（客戶端渲染）架構。
                </li>
                <li>
                  <span className="font-medium text-slate-800">效能優化實踐：</span>
                  在實務上，我透過 Lazy Loading 與 Code Splitting
                  實現按需加載，並搭配圖片壓縮與 Intersection Observer API
                  進行延遲加載（Lazy Load），顯著提升 Core Web Vitals 效能指標。
                </li>
                <li>
                  <span className="font-medium text-slate-800">質量與安全保障：</span>
                  開發過程中，除了使用 Postman 嚴謹驗證 RESTful API
                  的正確性，我也導入 Cloud Sonarqube 進行代碼靜態分析，從源頭確保程式碼的穩定性與資安防禦強度。
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-5">
              <h4 className="font-medium text-slate-800">部署流程</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                在部署流程上，我熟悉利用 GitHub Actions 來跑 CI 流程，並有 Docker 容器化的實務經驗。在近期的自學專案中，我也串接了 Firebase 來儲存用戶登入資料，並透過 Vercel 快速完成部署。
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-5">
              <h4 className="font-medium text-slate-800">
                <a
                  href="https://medium.com/@mu-chuan-hung"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 transition-colors hover:text-primary-700 hover:underline"
                >
                  技術部落格
                </a>
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                我深信「教是最好的學」。每當在工作中接觸新技術或踩坑時，我習慣將其系統化整理成技術部落格。這不僅能檢視自己是否真正內化，更能透過重新編排，訓練自己向他人清晰論述技術的能力。近期我持續在
                Medium 記錄關於 Next.js MVC 與 CSR 的架構差異辨析、以及 React Native Expo
                開發指南等深度文章。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
