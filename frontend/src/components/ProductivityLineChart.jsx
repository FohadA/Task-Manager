import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from '../ui/ChartTooltip';

const GRID = '#e2e2e3';
const AXIS_TEXT = '#85858c';
const BRAND = '#ee7a31';

export const ProductivityLineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={230}>
    <LineChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke={GRID} />
      <XAxis
        dataKey="fecha"
        tickLine={false}
        axisLine={{ stroke: GRID }}
        tick={{ fill: AXIS_TEXT, fontSize: 11 }}
        minTickGap={22}
      />
      <YAxis
        allowDecimals={false}
        tickLine={false}
        axisLine={false}
        width={44}
        tick={{ fill: AXIS_TEXT, fontSize: 12 }}
      />
      <Tooltip
        cursor={{ stroke: '#a6a6ac', strokeWidth: 1 }}
        content={<ChartTooltip unit="completadas" />}
      />
      <Line
        type="monotone"
        dataKey="completedCount"
        name="Completadas"
        stroke={BRAND}
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 4.5, fill: BRAND, stroke: '#ffffff', strokeWidth: 2 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
