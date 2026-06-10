import { Header } from "./components/Header.jsx";
import { Banner } from "./components/Banner.jsx";
import { PromotionSection } from "./components/PromotionSection.jsx";
import { ContentGrid } from "./components/ContentGrid.jsx";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Banner />
      <main className="main">
        <div className="main__inner">
          <PromotionSection />
          <ContentGrid />
        </div>
      </main>
    </div>
  );
}
