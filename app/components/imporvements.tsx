import React from "react";

type Props = {
  
}

const Imporvements = () => {
  const data = {
    improvements: [
      {
        heading: "Quantify Impact",
        priority: "High",
        issues: [
          "Bulleted points focus on feature descriptions rather than measurable outcomes or results.",
          "Lack of metrics makes technical contributions appear passive.",
        ],
        suggestions: [
          "Include metrics like latency reduction, lighthouse scores, or user traffic.",
          "Use the Google 'X-Y-Z' formula.",
        ],
        example: {
          original:
            "Built a URL shortening service to generate compact links and handle fast redirection.",
          improved:
            "Optimized URL redirection latency by 30% using Redis caching and supported 1,000+ monthly requests.",
        },
      },
      {
        heading: "ATS Optimization",
        priority: "Medium",
        issues: [
          "Missing proper date formatting.",
          "Headers are not structured for ATS parsing.",
        ],
        suggestions: [
          "Use standard section headers.",
          "Format dates like 'August 2024 – June 2028 (Expected)'.",
        ],
        example: {
          original: "AUG 2024 - JUN 2028",
          improved: "August 2024 – June 2028 (Expected)",
        },
      },
      {
        heading: "Skills Categorization",
        priority: "Low",
        issues: [
          "Skills are listed without hierarchy.",
          "Mix of tools and concepts reduces readability.",
        ],
        suggestions: [
          "Group skills into Proficient / Familiar.",
          "Highlight important skills first.",
        ],
        example: {
          original: "Languages: JavaScript, TypeScript, Python, C/C++, SQL",
          improved:
            "Technical Skills: TypeScript (Proficient), JavaScript, Python, C++, SQL, React.js, Next.js",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-20 py-12">
      <h1 className="text-4xl font-semibold mb-12 border-b pb-4">
        Resume Improvements
      </h1>

      <div className="space-y-12">
        {data.improvements.map((item, index) => (
          <div key={index} className="border-b pb-10 last:border-none">
            {/* Heading + Priority */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{item.heading}</h2>

              <span
                className={`text-sm px-3 py-1 rounded-full border ${
                  item.priority === "High"
                    ? "bg-black text-white"
                    : item.priority === "Medium"
                      ? "bg-gray-200"
                      : "bg-white"
                }`}
              >
                {item.priority}
              </span>
            </div>

            {/* Issues */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Issues</h3>
              <ul className="list-disc list-inside text-base space-y-1">
                {item.issues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Suggestions</h3>
              <ul className="list-disc list-inside text-base space-y-1">
                {item.suggestions.map((sug, i) => (
                  <li key={i}>{sug}</li>
                ))}
              </ul>
            </div>

            {/* Example */}
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
