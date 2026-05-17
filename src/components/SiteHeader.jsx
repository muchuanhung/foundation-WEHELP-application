export function SiteHeader() {
  return (
    <header className="bg-gradient-to-br from-sky-900 via-sky-700 to-sky-600 px-5 py-10 text-white sm:py-12">
      <div className="mx-auto max-w-[720px]">
        <p className="mb-2 text-[0.8125rem] font-medium tracking-widest uppercase opacity-85">
          台灣人工智慧學校 · 申請資料
        </p>
        <h1 className="mb-1.5 text-[clamp(1.5rem,4vw,1.875rem)] leading-snug font-bold">
          基礎模型實作 — 申請問答
        </h1>
        <p className="mb-4 text-lg font-medium opacity-95">MuChuan Hung</p>
        <p className="max-w-[42em] text-[0.9375rem] leading-relaxed opacity-88">
          以下為招生申請表所需之公開問答。請將各段佔位文字替換為您的真實內容後再提交報名。
        </p>
      </div>
    </header>
  );
}
