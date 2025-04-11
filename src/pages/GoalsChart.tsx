import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList
  } from "recharts";
  import { useStore } from "../store/useStore";
  
  const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const radius = 10;
  
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={radius}
          ry={radius}
        />
      </g>
    );
  };
  
  export function GoalsChart() {
    const { goals } = useStore();
  
    const chartData = goals.map(goal => ({
      title: goal.title,
      progress: Math.min((goal.currentAmount / goal.targetAmount) * 100, 100),
    }));
  
    return (
      <div className="bg-white p-6 rounded-2xl ">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📊 Goal Progress Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar
              dataKey="progress"
              fill="#6366f1"
              shape={<CustomBar />}
            >
              <LabelList
                dataKey="progress"
                position="top"
                formatter={(val: number) => `${Math.round(val)}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  