import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartTooltip } from '../ui/ChartTooltip';

const GRID = '#e2e2e3';
const AXIS_TEXT = '#85858c';

export const StatusBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={230}>
    <BarChart data={data} margin={{ top: 22, right: 8, left: -18, bottom: 0 }}>
      <CartesianGrid vertical={false} stroke={GRID} />
      <XAxis
        dataKey="label"
        interval={0}
        tickLine={false}
        axisLine={{ stroke: GRID }}
        tick={{ fill: AXIS_TEXT, fontSize: 11 }}
      />
      <YAxis
        allowDecimals={false}
        tickLine={false}
        axisLine={false}
        width={44}
        tick={{ fill: AXIS_TEXT, fontSize: 12 }}
      />
      <Tooltip cursor={{ fill: 'rgba(0,0,0,0.035)' }} content={<ChartTooltip unit="tareas" />} />
      <Bar dataKey="count" name="Tareas" radius={[4, 4, 0, 0]} maxBarSize={72}>
        <LabelList
          dataKey="count"
          position="top"
          offset={9}
          fill="#232326"
          fontSize={13}
          fontWeight={600}
        />
        {data.map((entry) => (
          <Cell key={entry.label} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
