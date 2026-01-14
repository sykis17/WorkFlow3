import React from 'react';

export default function OperationalDashboard() {
  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 shadow-lg h-full">
      <h4 className="text-white mb-4 border-b border-slate-700 pb-2 flex items-center gap-2">
        📊 Operatiivinen tilanne
      </h4>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>Projektin eteneminen</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-blue-500 text-xs">
          <p className="text-white font-semibold mb-1 italic">Päivän tavoite:</p>
          <p className="text-slate-400">Varaston inventointi ja raportointi Geminin kautta.</p>
        </div>
      </div>
    </div>
  );
}