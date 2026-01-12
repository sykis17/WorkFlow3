import React, { useState } from 'react';

export default function TimeCalculator() {
  const [rows, setRows] = useState([{ h: '', m: '' }]);

  const addRow = () => setRows([...rows, { h: '', m: '' }]);

  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const removeRow = (index) => {
    if (rows.length > 1) setRows(rows.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    let totalMinutes = 0;
    rows.forEach(row => {
      totalMinutes += (parseInt(row.h) || 0) * 60 + (parseInt(row.m) || 0);
    });
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="bg-black p-6 rounded-3xl border border-slate-200 shadow-sm max-w-md my-8">
      <h3 className="text-xl font-black text-slate-500! mb-1">Työaikalaskin</h3>
      <p className="text-sm text-slate-500 mb-6">Lisää vuorot laskeaksesi kokonaisajan.</p>

      <div className="space-y-3 mb-6">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
            <input
              type="number"
              placeholder="h"
              className="w-20 p-2 rounded-xl border border-slate-200 outline-none transition-all"
              value={row.h}
              onChange={(e) => updateRow(index, 'h', e.target.value)}
            />
            {/* Käytetään slate-400 mutta pakotetaan se, jotta se ei muutu valkoiseksi yömoodissa */}
            <span className="font-bold text-slate-400 dark:text-slate-400!"> : </span>
            <input
              type="number"
              placeholder="m"
              className="w-20 p-2 rounded-xl border border-slate-200 outline-none transition-all"
              value={row.m}
              onChange={(e) => updateRow(index, 'm', e.target.value)}
            />
            {/* ... poistonappi ... */}
          </div>
        ))}
      </div>

      <button 
        onClick={addRow}
        className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-blue-300 hover:text-blue-500 transition-all cursor-pointer bg-transparent mb-6"
      >
        + Lisää rivi
      </button>

      <div className="bg-slate-900 p-4 rounded-2xl text-center">
        <span className="text-slate-400 text-xs uppercase font-black tracking-widest block mb-1">Yhteensä</span>
        <span className="text-white text-3xl font-black">{calculateTotal()}</span>
      </div>
    </div>
  );
}