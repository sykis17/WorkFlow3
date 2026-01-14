import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import TaskCard from './TaskCard';

export default function WorkerDashboard() {
  const stats = [
    { label: 'Aktiiviset tehtävät', value: '4', color: 'text-blue-400' },
    { label: 'Tunnit tänään', value: '6.5h', color: 'text-green-400' },
    { label: 'Turvahuomiot', value: '0', color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg">
      <h4 className="text-white mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
        👷 Työntekijän näkymä
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg">
            <span className="text-slate-400 text-sm">{stat.label}</span>
            <span className={`font-bold ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-500 transition-colors">
        Kirjaa uusi tapahtuma
      </button>
    </div>
  );
}