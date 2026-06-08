import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { PromotionSection } from "./components/PromotionSection.jsx";
import { ContentGrid } from "./components/ContentGrid.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <main className="mx-auto box-border w-[90%] max-w-content py-6 desktop:w-full desktop:px-0">
        <div className="flex flex-col gap-grid">
          <PromotionSection />
          <ContentGrid />
        </div>
      </main>
    </div>
  );
}
