import { MessageCircle } from "lucide-react";

export function RemarksSection() {
  return (
    <section id="remarks" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <MessageCircle className="h-5 w-5 text-primary-600" />
          想說的話
        </h2>

        <div className="mt-6">
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6">
            <p className="leading-relaxed text-slate-600">
            對軟體工程師來說，能發現問題很好，但如果能帶著脈絡、選項與建議一起出現，而是來幫助把事情往前推進的。
            期許自己在未來課程與專題製作上，都能帶有著想法與建議，而不是單純的問題不去思考，讓彭彭老師驕傲。
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
            <span>感謝您撥冗審閱此申請</span>
          </div>
        </div>
      </div>
    </section>
  );
}
