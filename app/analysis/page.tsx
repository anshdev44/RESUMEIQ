"use client"
import {
Radar,
RadarChart,
PolarGrid,
PolarAngleAxis,
PolarRadiusAxis,
ResponsiveContainer,
Tooltip
} from "recharts";

const skills = [
{ skill: "Programming", value: 80 },
{ skill: "Web Dev", value: 75 },
{ skill: "Tools", value: 60 },
{ skill: "Soft Skills", value: 55 },
{ skill: "Problem Solving", value: 70 }
];

export default function AnalysisPage() {

const score = 78;
const ats = 82;

return (
<div className="min-h-screen bg-gray-50 p-10">

<div className="max-w-6xl mx-auto">

<h1 className="text-4xl font-bold mb-2">Resume Analysis</h1>
<p className="text-gray-500 mb-10">
AI powered insights about your resume performance
</p>

<div className="grid md:grid-cols-2 gap-6 mb-10">

<div className="bg-white rounded-xl p-8 shadow-sm border text-center">

<p className="text-gray-500 mb-3">Overall Score</p>

<div className="text-6xl font-bold">{score}</div>

<p className="text-green-600 mt-2 font-medium">
Good Resume Strength
</p>

</div>

<div className="bg-white rounded-xl p-8 shadow-sm border">

<p className="text-gray-500 mb-4">ATS Compatibility</p>

<div className="w-full bg-gray-200 h-3 rounded-full">
<div
className="bg-black h-3 rounded-full"
style={{ width: `${ats}%` }}
></div>
</div>

<p className="mt-3 text-sm text-gray-600">
{ats}% ATS Friendly
</p>

</div>

</div>

<div className="bg-white rounded-xl p-8 shadow-sm border mb-10">

<h2 className="text-lg font-semibold mb-6">
Skills Distribution
</h2>

<div className="h-[350px]">

<ResponsiveContainer width="100%" height="100%">

<RadarChart data={skills}>

<PolarGrid />

<PolarAngleAxis dataKey="skill" />

<PolarRadiusAxis />

<Tooltip />

<Radar
dataKey="value"
stroke="#111"
fill="#111"
fillOpacity={0.2}
/>

</RadarChart>

</ResponsiveContainer>

</div>

</div>

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white rounded-xl p-6 shadow-sm border">

<h3 className="font-semibold mb-4">
Strengths
</h3>

<ul className="space-y-2 text-gray-600">
<li>Strong technical skills</li>
<li>Good project experience</li>
<li>Clear resume structure</li>
</ul>

</div>

<div className="bg-white rounded-xl p-6 shadow-sm border">

<h3 className="font-semibold mb-4">
Suggestions
</h3>

<ul className="space-y-2 text-gray-600">
<li>Add quantified achievements</li>
<li>Include more industry keywords</li>
<li>Improve summary section</li>
</ul>

</div>

</div>

</div>

</div>
);
}