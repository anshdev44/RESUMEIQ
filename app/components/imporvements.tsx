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
  console.log("ye hai asli",data);

  // if (!data || !data.improvements) {
  //   return <div>Loading improvements...</div>;
  // }
  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-20 py-12">
      <h1 className="text-4xl font-semibold mb-12 border-b pb-4">
        Resume Improvements
      </h1>

      <div className="space-y-12">
        {data.improvements.map((item: Improvement, index: number) => (
          <div key={index} className="border-b pb-10 last:border-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{item.heading}</h2>

              <span
                className={`text-sm px-3 py-1 rounded-full border ${
                  item.priority === "High"
                    ? "bg-red-700 text-white font-bold"
                    : item.priority === "Medium"
                      ? "bg-orange-400 text-white font-bold"
                      : "bg-green-500 text-white font-bold"
                }`}
              >
                {item.priority}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Issues</h3>
              <ul className="list-disc list-inside text-base space-y-1">
                {item.issues.map((issue: string, i: number) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Suggestions</h3>
              <ul className="list-disc list-inside text-base space-y-1">
                {item.suggestions.map((sug: string, i: number) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Example Improvement</h3>
              <p className="text-sm line-through opacity-60">
                {item.example.original}
              </p>
              <p className="text-base mt-2 font-medium">
                {item.example.improved}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imporvements;
