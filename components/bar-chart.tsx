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
      color: "#333333",
    },
  } satisfies ChartConfig;

  const chartData = role.map((item) => ({
    name: item.role,
    value: item.score,
  }));

  return (
    <div className="w-full max-w-xl rounded-md bg-background p-4">
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
          <CartesianGrid vertical={false} />

          <XAxis
            axisLine={false}
            dataKey="name"
            tickFormatter={(value) => String(value).slice(0, 3)}
            tickLine={false}
            tickMargin={10}
          />

          <ChartTooltip
            content={<ChartTooltipContent nameKey="name" />}
            cursor={false}
          />

          <Bar dataKey="value" fill="#333333" radius={8}>
            <LabelList
              className="fill-foreground"
              fontSize={12}
              offset={12}
              position="top"
              formatter={(value, entry: any) =>
                entry?.name ? `${entry.name}: ${value}` : value
              }
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartBarLabel;
