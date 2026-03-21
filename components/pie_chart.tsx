"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Time Distribution",
  },
  Work: {
    label: "Work Time",
    color: "var(--chart-1)",
  },
  Education: {
    label: "Education Time",
    color: "var(--chart-2)",
  },
  Projects: {
    label: "Projects Time",
    color: "var(--chart-3)",
  },
  Certifications: {
    label: "Certifications Time",
    color: "var(--chart-4)",
  },
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
    { name: "Work", value: ct.work, fill: "var(--chart-1)" },
    { name: "Education", value: ct.education, fill: "var(--chart-2)" },
    { name: "Projects", value: ct.projects, fill: "var(--chart-3)" },
    { name: "Certifications", value: ct.certifications, fill: "var(--chart-4)" },
  ];

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer
          className="aspect-square w-80 h-80"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              label={({ payload, ...props }) => (
                <text
                  className="fill-foreground"
                  cx={props.cx}
                  cy={props.cy}
                  dominantBaseline={props.dominantBaseline}
                  textAnchor={props.textAnchor}
                  x={props.x}
                  y={props.y}
                >
                  {payload.value}
                </text>
              )}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col gap-1 text-sm text-center mt-2">
        <div className="text-muted-foreground">
          Career Time Distribution
        </div>
      </div>
    </div>
  );
}

export default PieLabelCustom;