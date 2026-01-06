import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { nimi: 'Tammi', kulutus: 4000, paastot: 2400 },
  { nimi: 'Helmi', kulutus: 3000, paastot: 1398 },
  { nimi: 'Maalis', kulutus: 2000, paastot: 9800 },
  { nimi: 'Huhti', kulutus: 2780, paastot: 3908 },
  { nimi: 'Touko', kulutus: 1890, paastot: 4800 },
];

export default function EmissionChart() {
  return (
    <div style={{ width: '100%', height: 300, background: 'var(--ifm-background-surface-color)', padding: '20px', borderRadius: '12px', border: '1px solid var(--ifm-contents-border-color)' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nimi" stroke="var(--ifm-font-color-base)" />
          <YAxis stroke="var(--ifm-font-color-base)" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--ifm-background-color)', border: '1px solid var(--ifm-contents-border-color)' }}
          />
          <Legend />
          <Bar dataKey="kulutus" name="Polttoaine (L)" fill="#25c2a0" />
          <Bar dataKey="paastot" name="CO2-päästöt (kg)" fill="#1877f2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}