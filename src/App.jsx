import { Sidebar } from "./components/Sidebar.jsx";
import { Header } from "./components/Header.jsx";
import { AboutSection } from "./components/AboutSection.jsx";
import { BackgroundSection } from "./components/BackgroundSection.jsx";
import { ScheduleSection } from "./components/ScheduleSection.jsx";
import { ChallengesSection } from "./components/ChallengesSection.jsx";
import { VisionSection } from "./components/VisionSection.jsx";
import { ValueSection } from "./components/ValueSection.jsx";
import { EffortsSection } from "./components/EffortsSection.jsx";
import { RemarksSection } from "./components/RemarksSection.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App({ showQ7 = false }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Skip to content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
      >
        跳至主要內容
      </a>

      {/* Sticky Sidebar Navigation */}
      <Sidebar showQ7={showQ7} />

      {/* Main Content Area */}
      <div className="lg:ml-56">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main" className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
          <div className="space-y-12">
            <AboutSection />
            <BackgroundSection />
            <ScheduleSection />
            <ChallengesSection />
            <VisionSection />
            <ValueSection />
            <EffortsSection show={showQ7} />
            <RemarksSection />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
