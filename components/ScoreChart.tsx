import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { ScoreData } from '../types';

interface ScoreChartProps {
  data: ScoreData[];
}

export const ScoreChart: React.FC<ScoreChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 bg-white rounded-xl">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6 text-center">Performance Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e4e4e7" />
          <PolarAngleAxis dataKey="category" tick={{ fill: '#52525b', fontSize: 11, fontWeight: 500 }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#18181b"
            strokeWidth={2}
            fill="#18181b"
            fillOpacity={0.1}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', padding: '8px 12px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};