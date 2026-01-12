import React, { useState, useEffect } from 'react';

export default function TaskCard({ task }) {
  const [taskState, setTaskState] = useState({
    checked: {},
    stepComments: {},
    hasIssue: false,
    isApproved: false
  });

  const loadSavedState = () => {
    try {
      const saved = localStorage.getItem(`task_full_state_${task.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTaskState({
          ...parsed,
          checked: parsed.checked || {},
          stepComments: parsed.stepComments || {}
        });
      }
    } catch (e) {
      console.error("Virhe ladattaessa tilaa", e);
    }
  };

  useEffect(() => {
    loadSavedState();
    window.addEventListener('storage', loadSavedState);
    return () => window.removeEventListener('storage', loadSavedState);
  }, [task.id]);

  const updateState = (newFields) => {
    const updated = { ...taskState, ...newFields };
    setTaskState(updated);
    localStorage.setItem(`task_full_state_${task.id}`, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const toggleStep = (index) => {
    if (taskState.isApproved) return;
    const newChecked = { ...(taskState.checked || {}), [index]: !taskState.checked[index] };
    updateState({ checked: newChecked });
  };

  const updateStepComment = (index, val) => {
    if (taskState.isApproved) return;
    const newComments = { ...(taskState.stepComments || {}), [index]: val };
    updateState({ stepComments: newComments });
  };

  // UUSI: Toiminto ongelman kytkemiseen päälle/pois
  const toggleIssue = () => {
    if (taskState.isApproved) return;
    updateState({ hasIssue: !taskState.hasIssue });
  };

  const completedCount = Object.values(taskState.checked || {}).filter(Boolean).length;
  const totalSteps = task.steps?.length || 0;
  const isAllDone = totalSteps > 0 && completedCount === totalSteps;

  return (
    <div className={`mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-4 transition-all duration-300 ${taskState.isApproved ? 'border-green-500' : taskState.hasIssue ? 'border-orange-500 scale-[1.01]' : 'border-white'}`}>
      
      {/* Yläpalkki */}
      <div className={`${taskState.isApproved ? 'bg-green-600' : taskState.hasIssue ? 'bg-orange-600 animate-pulse' : isAllDone ? 'bg-blue-600' : 'bg-slate-900'} p-6 text-white`}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-xl font-black m-0 uppercase tracking-tight">{task.title}</h2>
            <div className="flex gap-2 mt-1">
              <span className="text-[9px] font-bold opacity-60 uppercase tracking-widest">Valmius: {completedCount}/{totalSteps}</span>
            </div>
          </div>
          
          {/* TÄMÄ PAINIKE PUUTTUI: Ongelmailmoitus */}
          {!taskState.isApproved && (
            <button 
              onClick={toggleIssue}
              className={`px-4 py-2 rounded-2xl text-[10px] font-black border-2 transition-all active:scale-90 ${
                taskState.hasIssue 
                ? 'bg-white text-orange-600 border-white shadow-lg' 
                : 'bg-transparent text-white border-white/30 hover:border-white'
              }`}
            >
              {taskState.hasIssue ? '⚠️ ONGELMA PÄÄLLÄ' : 'ILMOITA ONGELMA'}
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {task.steps?.map((step, i) => (
          <div key={i} className={`p-5 rounded-3xl border-2 transition-all ${taskState.checked && taskState.checked[i] ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex items-start gap-4 mb-3">
              <div 
                onClick={() => toggleStep(i)}
                className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center font-black cursor-pointer shadow-md transition-all active:scale-90 ${
                  taskState.checked && taskState.checked[i] ? 'bg-green-500 text-white shadow-green-200' : 'bg-white text-blue-600 border-2 border-blue-50 shadow-sm'
                }`}
              >
                {taskState.checked && taskState.checked[i] ? '✓' : String.fromCharCode(97 + i)}
              </div>
              <div className="pt-1">
                <p className={`font-black text-sm m-0 leading-tight ${taskState.checked && taskState.checked[i] ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {step.label}
                </p>
                {step.requirePhoto && (
                  <span className="text-[9px] font-black text-blue-500 uppercase mt-1 block tracking-tighter">📷 Ota valokuva suorituksesta</span>
                )}
              </div>
            </div>
            
            <input 
              disabled={taskState.isApproved}
              className="w-full bg-slate-100/50 border-none p-3 rounded-xl text-xs text-slate-700 outline-none focus:ring-2 ring-blue-500/20 placeholder:text-slate-300"
              placeholder="Kirjaa huomiot tähän vaiheeseen..."
              value={(taskState.stepComments && taskState.stepComments[i]) || ''}
              onChange={(e) => updateStepComment(i, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}