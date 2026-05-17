import { Clock } from "lucide-react";

const scheduleData = [
  { day: "週一", hours: 3, activities: "線上課程學習 ＆ 早上會議" },
  { day: "週二", hours: 2, activities: "線上課程學習" },
  { day: "週三", hours: 3, activities: "實作練習" },
  { day: "週四", hours: 2, activities: "線上課程學習" },
  { day: "週五", hours: 3, activities: "實作練習" },
  { day: "週六", hours: 6, activities: "實作練習 / 複習" },
  { day: "週日", hours: 6, activities: "實作練習 / 複習" },
];

export function ScheduleSection() {
  const totalHours = scheduleData.reduce((sum, item) => sum + item.hours, 0);

  return (
    <section id="schedule" className="scroll-mt-8">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-900">
            <Clock className="h-5 w-5 text-primary-600" />
            學習時間安排
          </h2>
          <div className="rounded-lg bg-primary-50 px-4 py-2">
            <span className="text-sm text-slate-600">每週總時數：</span>
            <span className="ml-1 font-semibold text-primary-700">
              {totalHours} 小時
            </span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 text-left text-sm font-medium text-slate-500">
                  日期
                </th>
                <th className="pb-3 text-left text-sm font-medium text-slate-500">
                  學習時數
                </th>
                <th className="pb-3 text-left text-sm font-medium text-slate-500">
                  主要活動
                </th>
                <th className="pb-3 text-left text-sm font-medium text-slate-500">
                  投入程度
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scheduleData.map((item) => (
                <tr key={item.day}>
                  <td className="py-3 font-medium text-slate-900">
                    {item.day}
                  </td>
                  <td className="py-3 text-slate-600">{item.hours} 小時</td>
                  <td className="py-3 text-slate-600">{item.activities}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${(item.hours / 6) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500">
                        {Math.round((item.hours / 6) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-600">
        雖然目前有正職在身，但由於我對工作節奏掌控度高，經常能提前完工，這讓我擁有極具彈性的自主學習時間。          
        </p>
      </div>
    </section>
  );
}
