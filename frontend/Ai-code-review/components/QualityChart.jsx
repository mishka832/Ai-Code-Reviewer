import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const QualityChart = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 60) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  const safeScore = typeof score === "number" && score >= 0 ? score : 0;

  const data = [
    { name: "Score", value: safeScore },
    { name: "Remaining", value: 100 - safeScore },
  ];

  const scoreColor = getScoreColor(safeScore);

  return (
    <div className="relative w-48 h-48">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            <Cell fill={scoreColor} />
            <Cell fill="#e5e7eb" /> {/* gray-200 */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Centered Score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold text-foreground">{safeScore}</div>
        <div className="text-sm text-muted-foreground">out of 100</div>
      </div>
    </div>
  );
};
