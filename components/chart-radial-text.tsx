
"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"



const chartConfig = {
  visitors: {
    label: "Score",
  },
} satisfies ChartConfig

export default function Component(props: { score: number }) {
  const chartData = [
    { browser: "score", visitors: props.score ?? 0, fill: "#10b981" },
  ]
  const value = chartData[0].visitors

  return (
    <div className="w-full flex items-center justify-center bg-transparent">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-[220px] h-[220px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 - (value / 100) * 360}
            innerRadius={60}
            outerRadius={80}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-gray-100 dark:first:fill-zinc-800 last:fill-transparent"
              polarRadius={[65, 50]}
            />
            <RadialBar
              dataKey="visitors"
              cornerRadius={10}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-black dark:fill-white text-3xl font-bold"
                        >
                          {value}%
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
    </div>
  )
}

