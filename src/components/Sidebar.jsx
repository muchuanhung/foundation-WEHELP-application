import { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Clock,
  Heart,
  Brain,
  Lightbulb,
  RefreshCw,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { id: "about", label: "個人簡介", icon: User },
  { id: "background", label: "職業學歷", icon: Briefcase },
  { id: "schedule", label: "學習時間安排", icon: Clock },
  { id: "challenges", label: "逆境處理", icon: Heart },
  { id: "vision", label: "技術心得", icon: Brain },
  { id: "value", label: "人工智慧發展與影響", icon: Lightbulb },
  { id: "remarks", label: "想說的話", icon: MessageCircle },
];

export function Sidebar({ showQ7 = false }) {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter((item) => showQ7 || item.id !== "efforts")
        .map((item) => item.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showQ7]);

  const filteredNavItems = navItems.filter(
    (item) => showQ7 || item.id !== "efforts"
  );

  return (
    <aside className="hidden lg:block fixed left-0 top-0 h-screen w-56 border-r border-slate-200 bg-white pt-8">
      <nav className="space-y-1 px-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${isActive ? "text-primary-600" : "text-slate-400"}`}
              />
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
