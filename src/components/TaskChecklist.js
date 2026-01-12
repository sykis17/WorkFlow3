import React from 'react';
import Translate from '@docusaurus/Translate';

export default function TaskChecklist({ tasks }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-xl font-bold mb-4 text-slate-800">
        <Translate id="report.title">Työvaiheen raportointi</Translate>
      </h3>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-100">
            <span className="text-slate-700 font-medium">{task.label}</span>
            <div className="flex gap-2">
              <button className="bg-slate-200 hover:bg-yellow-400 p-2 rounded text-xs transition-colors">
                <Translate id="status.started">Aloitettu</Translate>
              </button>
              <button className="bg-slate-200 hover:bg-green-500 p-2 rounded text-xs transition-colors">
                <Translate id="status.done">Valmis</Translate>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform active:scale-95">
        <Translate id="button.send">Lähetä raportti</Translate>
      </button>
    </div>
  );
}