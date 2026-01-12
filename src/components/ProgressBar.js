import React, { useState, useEffect, useCallback } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ProgressBar() {
  const [stats, setStats] = useState({ completed: 0, total: 0 });
  const jsonPath = useBaseUrl('/data/tasks.json');

  // Luodaan funktio laskentaa varten, jotta voimme kutsua sitä useasta paikasta
  const calculateProgress = useCallback(() => {
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        const total = data.length;
        const completed = data.filter(task => 
          localStorage.getItem(`task_status_${task.id}`) === 'done'
        ).length;
        setStats({ completed, total });
      })
      .catch(err => console.error("Laskenta epäonnistui:", err));
  }, [jsonPath]);

  useEffect(() => {
    // 1. Lasketaan heti ladattaessa
    calculateProgress();

    // 2. Asetetaan kuuntelija: jos LocalStorage muuttuu toisessa välilehdessä
    const handleStorageChange = (e) => {
      if (e.key && e.key.startsWith('task_status_')) {
        console.log("Huomattu muutos toisessa välilehdessä!");
        calculateProgress();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Siivotaan kuuntelija, kun komponentti poistuu
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [calculateProgress]);

  const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="my-8 p-6 bg-white rounded-2xl shadow-lg border border-blue-100 ring-4 ring-blue-50/50">
      <div className="flex justify-between items-end mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Live Seuranta</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 m-0 tracking-tight">{percentage}%</h2>
        </div>
        <div className="text-right">
          <span className="text-[11px] font-bold text-slate-400 block mb-1">STATUS</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {stats.completed} / {stats.total} VALMIINA
          </span>
        </div>
      </div>
      
      <div className="w-full bg-slate-100 rounded-full h-6 overflow-hidden p-1.5 border border-slate-200">
        <div 
          className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 h-full rounded-full transition-all duration-700 ease-[custom-bezier]"
          style={{ 
            width: `${percentage}%`,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' 
          }}
        ></div>
      </div>
    </div>
  );
}