import { Heart } from "lucide-react";

export function ChallengesSection() {
  return (
    <section id="challenges" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <Heart className="h-5 w-5 text-primary-600" />
          逆境與情緒處理
        </h2>

        <div className="mt-6 space-y-6">
          <div className="rounded-lg border-l-4 border-primary-500 bg-slate-50 p-6">
            <h3 className="font-medium text-slate-800">面臨的挑戰</h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              在職場上，與跨部門團隊協作是常態。我曾遭遇過溝通態度較為強硬的 PM，在密集的專案死線下，那種帶有壓迫感的對話方式，一度讓我感到無力與沮喪，也對每天的工作氣氛產生了抗拒。
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-6">
            <h3 className="font-medium text-slate-800">情緒處理方式</h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              為了不讓負面情緒影響工作產出，我轉化心情，把對方的嚴苛當作檢視自己程式碼的標準。我把力氣花在做好每一個技術細節上，在 PM 提出需求前，就先規劃好潛在問題的防範措施，以確保開發品質與交付時的穩定性。
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-6">
            <h3 className="font-medium text-slate-800">學習與成長</h3>
            <p className="mt-2 leading-relaxed text-slate-600">
              這次的經歷帶給我非常大的心理成長。當看到原本態度強硬的夥伴，最後變成信任我、甚至在急件時信賴我的戰友，我明白了解決困境最好的武器就是「自己的專業」。這讓我未來在面對訓練營的高強度挑戰或卡關時，更懂得如何抽離情緒、直視問題本質。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
