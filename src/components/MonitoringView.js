import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function MonitoringView() {
  const [tasks, setTasks] = useState([]);
  const jsonPath = useBaseUrl('/data/tasks.json');

  const loadEverything = () => {
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        const enriched = data.map(task => {
          const state = JSON.parse(localStorage.getItem(`task_full_state_${task.id}`) || '{}');
          return { ...task, state };
        });
        setTasks(enriched);
      }).catch(() => {});
  };

  useEffect(() => {
    loadEverything();
    const interval = setInterval(loadEverything, 2000);
    return () => clearInterval(interval);
  }, []);

  const approveTask = (id) => {
    const s = JSON.parse(localStorage.getItem(`task_full_state_${id}`) || '{}');
    localStorage.setItem(`task_full_state_${id}`, JSON.stringify({ ...s, isApproved: true }));
    loadEverything();
  };

  const totalTasks = tasks.length;
  const approvedTasks = tasks.filter(t => t.state.isApproved).length;
  const issueTasks = tasks.filter(t => t.state.hasIssue).length;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. YLÄPANEELI: TILASTOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
          <div><p className="text-[10px] font-black uppercase text-slate-400 m-0">Kohteet yhteensä</p><h2 className="m-0 text-2xl font-black text-slate-800">{totalTasks}</h2></div>
          <div className="text-3xl">🏗️</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center border-b-4 border-b-green-500">
          <div><p className="text-[10px] font-black uppercase text-slate-400 m-0">Hyväksytty</p><h2 className="m-0 text-2xl font-black text-green-600">{approvedTasks}</h2></div>
          <div className="text-3xl">✅</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center border-b-4 border-b-orange-500">
          <div><p className="text-[10px] font-black uppercase text-slate-400 m-0">Aktiiviset hälytykset</p><h2 className="m-0 text-2xl font-black text-orange-600">{issueTasks}</h2></div>
          <div className="text-3xl">⚠️</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. VASEN: YKSITYISKOHTAINEN SEURANTA */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Yksityiskohtainen tilanne</h3>
          {tasks.map(task => {
            const state = task.state || {};
            const doneSteps = state.checked ? Object.values(state.checked).filter(Boolean).length : 0;
            const totalSteps = task.steps?.length || 0;

            return (
              <div key={task.id} className={`bg-white rounded-[2rem] p-6 shadow-sm border-2 transition-all ${state.isApproved ? 'border-green-100 opacity-80' : state.hasIssue ? 'border-orange-200' : 'border-slate-50'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-black text-slate-800 m-0">{task.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {task.id}</span>
                  </div>
                  {doneSteps === totalSteps && !state.isApproved && (
                    <button onClick={() => approveTask(task.id)} className="bg-green-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase hover:bg-green-700 transition-all">Hyväksy työ</button>
                  )}
                  {state.isApproved && <span className="text-green-500 font-black text-[10px] uppercase border border-green-200 px-3 py-1 rounded-full bg-green-50">Tarkastettu</span>}
                </div>

                {/* ALAVAIHEIDEN TILANNE JA KOMMENTIT */}
                <div className="space-y-3">
                  {task.steps?.map((step, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 bg-slate-50/50 p-3 rounded-2xl">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${state.checked && state.checked[i] ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {String.fromCharCode(97 + i)}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold m-0 text-slate-700">{step.label}</p>
                        {state.stepComments && state.stepComments[i] && (
                          <p className="text-[11px] m-0 text-blue-600 italic font-medium">" {state.stepComments[i]} "</p>
                        )}
                      </div>
                      {step.requirePhoto && state.checked && state.checked[i] && <span className="text-[10px] opacity-40">📷 LIITE OK</span>}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. OIKEA: NOPEA LOKI (TAPAHTUMAT) */}
        <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white h-fit max-h-[800px] overflow-auto sticky top-4">
           <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> Live-ilmoitukset
           </h3>
           <div className="space-y-4 text-[11px]">
             {tasks.map(t => (
               t.state.hasIssue && (
                 <div key={t.id} className="p-3 bg-orange-500/10 border-l-2 border-orange-500 rounded text-orange-200">
                   <strong>HÄLYTYS:</strong> {t.title} raportoi ongelman.
                 </div>
               )
             ))}
             {tasks.map(t => (
               t.state.isApproved && (
                 <div key={t.id} className="p-3 bg-green-500/10 border-l-2 border-green-500 rounded text-green-200">
                   <strong>KUITTUS:</strong> {t.title} tarkastettu.
                 </div>
               )
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}