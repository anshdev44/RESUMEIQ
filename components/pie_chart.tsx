"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: { label: "Time Distribution" },
  Work: { label: "Work", color: "#6366f1" },
  Education: { label: "Education", color: "#10b981" },
  Projects: { label: "Projects", color: "#f43f5e" },
  Certifications: { label: "Certifications", color: "#f59e0b" },
} satisfies ChartConfig;

type Props = {
  ct: {
    work: number;
    education: number;
    projects: number;
    certifications: number;
  };
};

export function PieLabelCustom({ ct }: Props) {
  const chartData = [
    { name: "Work", value: ct?.work || 0, fill: chartConfig.Work.color },
    { name: "Education", value: ct?.education || 0, fill: chartConfig.Education.color },
    { name: "Projects", value: ct?.projects || 0, fill: chartConfig.Projects.color },
    { name: "Certifications", value: ct?.certifications || 0, fill: chartConfig.Certifications.color },
  ].filter(d => d.value > 0);

  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
        <ChartContainer
          className="mx-auto w-[220px] h-[220px]"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              stroke="none"
              label={({ payload, ...props }) => (
                <text
                  className="fill-black dark:fill-white text-[10px] font-medium"
                  cx={props.cx}
                  cy={props.cy}
                  dominantBaseline={props.dominantBaseline}
                  textAnchor={props.textAnchor}
                  x={props.x}
                  y={props.y}
                >
                  {payload.name}
                </text>
              )}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
    </div>
  );
}

export default PieLabelCustom;