"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  role: { role: string; score: number }[];
};

const ChartBarLabel = ({ role }: Props) => {
  const chartConfig = {
    value: {
      label: "Score",
      color: "#6366f1",
    },
  } satisfies ChartConfig;

  const chartData = role?.map((item) => ({
    name: item.role,
    value: item.score,
  })) || [];

  return (
    <div className="w-full flex flex-col justify-center bg-transparent px-2">
      <ChartContainer config={chartConfig} className="w-full h-[220px]">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis
            axisLine={false}
            dataKey="name"
            tickFormatter={(value) => String(value).length > 8 ? String(value).slice(0, 8) + "..." : String(value)}
            tickLine={false}
            tickMargin={10}
            fontSize={11}
          />
          <ChartTooltip
            content={<ChartTooltipContent nameKey="name" />}
            cursor={false}
          />
          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
            <LabelList
              className="fill-black dark:fill-white"
              fontSize={11}
              offset={8}
              position="top"
              formatter={(value: number) => value}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartBarLabel;
