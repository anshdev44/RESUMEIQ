import React from "react";

type Improvement = {
  heading: string;
  priority: "High" | "Medium" | "Low";
  issues: string[];
  suggestions: string[];
  example: {
    original: string;
    improved: string;
  };
};

type ImprovementsData = {
  improvements: Improvement[];
};

type Props = {
  data: ImprovementsData;
};
const Imporvements = ({ data }: Props) => {
  if (!data?.improvements?.length) return null;

  return (
    <div className="w-full bg-transparent text-gray-900 dark:text-zinc-100 py-4">
      <h2 className="text-2xl font-bold mb-8 border-b border-gray-200 dark:border-zinc-800 pb-4">
        Actionable Improvements
      </h2>

      <div className="space-y-8">
        {data.improvements.map((item: Improvement, index: number) => (
          <div key={index} className="border-b border-gray-200 dark:border-zinc-800 pb-8 last:border-none">
            <div className="flex justify-between items-start md:items-center mb-6 flex-col md:flex-row gap-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.heading}</h3>
              <span
                className={`text-xs px-3 py-1 rounded-full border shadow-sm font-semibold ${
                  item.priority === "High"
                    ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20"
                    : item.priority === "Medium"
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20"
                      : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                }`}
              >
                {item.priority} Priority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">Identified Issues</h4>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-700 dark:text-zinc-300">
                  {item.issues.map((issue: string, i: number) => (
                    <li key={i} className="leading-relaxed">{issue}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">Targeted Fixes</h4>
                <ul className="list-disc list-inside text-sm space-y-2 text-gray-700 dark:text-zinc-300">
                  {item.suggestions.map((sug: string, i: number) => (
                    <li key={i} className="leading-relaxed">{sug}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-zinc-800 p-5 rounded-xl shadow-inner">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">Example Transformation</h4>
              <div className="space-y-3 font-mono text-sm mt-4">
                <div className="flex gap-3 items-start">
                  <span className="text-red-500 shrink-0 select-none">[-]</span>
                  <span className="line-through text-gray-500 dark:text-zinc-500 bg-red-50 dark:bg-red-500/10 px-1 rounded break-words w-full">{item.example.original}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-emerald-500 shrink-0 select-none">[+]</span>
                  <span className="text-gray-900 dark:text-emerald-50 bg-emerald-50 dark:bg-emerald-500/10 px-1 rounded break-words w-full">{item.example.improved}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imporvements;
