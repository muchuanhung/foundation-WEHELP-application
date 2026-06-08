import { Lightbulb } from "lucide-react";

export function ValueSection() {
  return (
    <section id="value" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Lightbulb className="h-5 w-5 text-primary-600" />
          人工智慧發展與影響
        </h2>

        <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
          <p>
            面對 AI 對軟體工程師帶來的衝擊，我抱持著非常正向且期待的想法。就像當年智慧型手機改變了世界，雖然舊的模式消失了，卻帶來了更多便利性與全新的職業機會。現在的
            AI Agent（例如 Cursor、Copilot）對我而言就是催化劑。在日常開發中，它們能幫助我們跳過繁瑣的重複性程式碼編寫，讓工程師有更多心力去思考軟體的整體品質與商業邏輯。
          </p>
          <p>
            AI 的出現讓知識來源變得更多元、更即時。我深信，未來優秀的工程師不會被 AI
            淘汰，而被淘汰的會是拒絕使用 AI 的人。
          </p>
          <p>
            透過學習基礎模型的實作，我希望能更深刻地理解這些強大工具的本質，並將其轉化為自己的底氣，利用
            AI 實現更高效、更具創造力的全端開發。
          </p>
        </div>
      </div>
    </section>
  );
}
