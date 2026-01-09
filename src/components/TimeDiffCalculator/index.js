import React, { useState } from 'react';

export default function TimeDiffCalculator() {
  const [h1, setH1] = useState('');
  const [m1, setM1] = useState('');
  const [h2, setH2] = useState('');
  const [m2, setM2] = useState('');
  const [op, setOp] = useState('+');

  const calculate = () => {
    const min1 = (parseInt(h1) || 0) * 60 + (parseInt(m1) || 0);
    const val2H = parseInt(h2) || 0;
    const val2M = parseInt(m2) || 0;
    const min2 = val2H * 60 + val2M;

    let resultMin = 0;
    switch (op) {
      case '+': resultMin = min1 + min2; break;
      case '-': resultMin = min1 - min2; break;
      case '*': resultMin = min1 * (parseFloat(h2) || 1); break;
      case '/': 
        const divisor = parseFloat(h2) || 1;
        resultMin = divisor !== 0 ? min1 / divisor : 0; 
        break;
      default: resultMin = min1;
    }

    const absoluteMin = Math.abs(Math.round(resultMin));
    const h = Math.floor(absoluteMin / 60);
    const m = absoluteMin % 60;
    return `${resultMin < 0 ? '-' : ''}${h}h ${m}m`;
  };

  return (
    <div className="bg-black p-6 rounded-3xl border border-slate-200 shadow-sm max-w-md my-8">
      <h3 className="text-xl font-black text-slate-900 mb-1 tracking-tight">Monitoimilaskin</h3>
      <p className="text-sm text-slate-500 mb-6 font-medium tracking-tight">Laske summat, erotukset ja kertoimet.</p>
      
      {/* AIKA 1 */}
      <div className="flex items-center gap-3 mb-4">
        <input 
          type="number" placeholder="h" 
          className="w-20 p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
          value={h1} onChange={e => setH1(e.target.value)} 
        />
        <span className="font-bold text-slate-400">:</span>
        <input 
          type="number" placeholder="m" 
          className="w-20 p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
          value={m1} onChange={e => setM1(e.target.value)} 
        />
      </div>

      {/* OPERAATTORI */}
      <div className="flex justify-center my-4">
        <select 
          value={op} 
          onChange={e => setOp(e.target.value)} 
          className="bg-slate-100 border-none p-2 px-4 rounded-xl font-black text-blue-700 cursor-pointer hover:bg-slate-200 transition-colors outline-none"
        >
          <option value="+">+</option>
          <option value="-">−</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
      </div>

      {/* AIKA 2 TAI KERROIN */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <input 
            type="number" 
            placeholder={op === '*' || op === '/' ? "n" : "h"} 
            className="w-20 p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
            value={h2} onChange={e => setH2(e.target.value)} 
          />
          {(op === '+' || op === '-') && (
            <>
              <span className="font-bold text-slate-400">:</span>
              <input 
                type="number" placeholder="m" 
                className="w-20 p-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                value={m2} onChange={e => setM2(e.target.value)} 
              />
            </>
          )}
        </div>
        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-1">
          {op === '*' || op === '/' ? "Syötä kerroin tai jakaja" : "Syötä tunnit ja minuutit"}
        </p>
      </div>

      {/* TULOS */}
      <div className="bg-slate-900 p-4 rounded-2xl text-center">
        <span className="text-blue-200 text-xs uppercase font-black tracking-widest block mb-1">Lopputulos</span>
        <span className="text-white text-3xl font-black">{calculate()}</span>
      </div>
    </div>
  );
}