import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";

const SHOW_Q7 = false;

const questions = [
  {
    id: "q1",
    num: "01",
    title: "個人簡介和申請動機。",
    placeholder:
      "我是……，目前專注於……。申請本課程的動機是希望在……領域中，系統性地掌握基礎模型的實作能力，並能將所學應用於……。",
  },
  {
    id: "q2",
    num: "02",
    title: "目前的職業背景，若是剛畢業，畢業的科系為何？",
    placeholder:
      "目前任職於……，擔任……，主要工作內容包含……。（若剛畢業，請改寫為：畢業於○○大學○○系，畢業年份……）",
  },
  {
    id: "q3",
    num: "03",
    title: "如果參與這個訓練，會怎麼安排學習時間？",
    placeholder:
      "平日下班後約……小時，週末預留……小時進行預習、作業與專題實作；課程期間會優先保留上課日與專題截止前的時段，並以週計畫追蹤進度。",
  },
  {
    id: "q4",
    num: "04",
    title: "請描述一件產生明顯負面情緒的經歷，如何處理該情緒？",
    placeholder:
      "在……情境下，我曾因……感到挫折／焦慮。當時我先……（具體行動，例如：釐清問題、與他人溝通、拆解任務），並透過……調整心態，最終……。",
  },
  {
    id: "q5",
    num: "05",
    title: "最想使用自己開發的深度學習模型解決什麼問題？",
    placeholder:
      "我最想解決的是……領域中的……問題。希望透過自研模型在資料隱私、領域知識或成本可控的前提下，達成……的具體效益。",
  },
  {
    id: "q6",
    num: "06",
    title: "若終究無法達到 OpenAI 的程度，為何要學習基礎模型的實作？",
    placeholder:
      "學習目標並非複製 OpenAI 的規模，而是理解模型如何訓練、微調與部署，以便在企業或在地場景中，以開源模型與自有資料建構可信任、可維運的 AI 服務，並在成本、合規與可解釋性之間取得平衡。",
  },
  {
    id: "q7",
    num: "07",
    title: "從上次提出申請至今，多做了哪些努力？",
    placeholder:
      "（本欄位已隱藏，非第一次申請時請將 SHOW_Q7 設為 true 並填寫。）",
    hidden: true,
    badge: "第一次申請不適用",
  },
  {
    id: "q8",
    num: "08",
    title: "其他想要對我們說的事情？",
    placeholder: "（可留空，或補充您想讓審查委員了解的任何資訊。）",
  },
];

const visibleQuestions = questions.filter((q) => q.id !== "q7" || SHOW_Q7);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App visibleQuestions={visibleQuestions} />
  </StrictMode>,
);
