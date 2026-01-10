import React, { useState } from 'react';

const COLORS = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const FONTS = [
  { name: 'Inter (Sans)', class: 'font-inter' },
  { name: 'Playfair (Serif)', class: 'font-playfair' },
  { name: 'Lexend (Soft)', class: 'font-lexend' },
  { name: 'JetBrains (Mono)', class: 'font-jetbrains' },
  { name: 'Montserrat (Bold)', class: 'font-montserrat' },
  { name: 'Oswald (Narrow)', class: 'font-oswald' },
  { name: 'Space Grotesk', class: 'font-space' },
  { name: 'Fira Code', class: 'font-fira' },
];

export default function ColorPalette() {
  const [activeTarget, setActiveTarget] = useState('bg1');
  const [bg1, setBg1] = useState('bg-slate-900');
  const [bg2, setBg2] = useState('bg-blue-600');
  const [textStyle, setTextStyle] = useState({ color: '#ffffff' });
  const [previewFont, setPreviewFont] = useState('font-inter');

  const handleColorClick = (color, shade) => {
    const isText = activeTarget === 'text';
    const colorVar = `var(--color-${color}-${shade})`;
    const tailwindClass = `${isText ? 'text' : 'bg'}-${color}-${shade}`;

    if (activeTarget === 'bg1') setBg1(tailwindClass);
    if (activeTarget === 'bg2') setBg2(tailwindClass);
    if (isText) setTextStyle({ color: colorVar });

    navigator.clipboard.writeText(tailwindClass);
  };

  // Pikanapit mustalle ja valkoiselle
  const setQuickTextColor = (type) => {
    const color = type === 'white' ? '#ffffff' : '#0f172a';
    setTextStyle({ color: color });
    navigator.clipboard.writeText(type === 'white' ? 'text-white' : 'text-slate-950');
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. VERTAILUKORTTI */}
      <div className="bg-slate-900 p-4 md:p-8 rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-80 rounded-[2.5rem] overflow-hidden shadow-inner border border-slate-100">
          <div className={`${bg1} p-10 flex flex-col justify-center transition-all duration-700 ${previewFont}`} style={textStyle}>
            <h3 className="text-4xl font-black m-0 italic tracking-tighter uppercase leading-none">Style A</h3>
            <p className="mt-2 text-sm opacity-80 font-medium tracking-wide italic uppercase tracking-widest">{bg1}</p>
          </div>
          <div className={`${bg2} p-10 flex flex-col justify-center transition-all duration-700 ${previewFont}`} style={textStyle}>
            <h3 className="text-4xl font-black m-0 italic tracking-tighter uppercase leading-none">Style B</h3>
            <p className="mt-2 text-sm opacity-80 font-medium tracking-wide italic uppercase tracking-widest">{bg2}</p>
          </div>
        </div>

        {/* OHJAIMET */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 px-4">
          
          {/* Valitsin: Mitä muokataan */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            {['bg1', 'bg2'].map((t) => (
              <button 
                key={t}
                onClick={() => setActiveTarget(t)}
                className={`px-4 py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTarget === t ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {t === 'text' ? 'Teksti' : `Pohja ${t.slice(-1)}`}
              </button>
            ))}
          </div>

          {/* UUSI: Musta/Valkoinen pika-asetus */}
          <div className="flex gap-2 items-center">
            <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Pikavalinta tekstille:</span>
            <button 
              onClick={() => setQuickTextColor('white')}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-900 text-[9px] font-black rounded-lg shadow-sm hover:scale-105 transition-transform uppercase"
            >
              Valkoinen
            </button>
            <button 
              onClick={() => setQuickTextColor('black')}
              className="px-3 py-1.5 bg-slate-900 text-white text-[9px] font-black rounded-lg shadow-sm hover:scale-105 transition-transform uppercase"
            >
              Musta
            </button>
          </div>

        </div>
      </div>

      {/* 2. FONTTITAULUKKO (Hover) */}
      <section>
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 ml-2 italic">Valitse Fontti</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {FONTS.map((f) => (
            <div 
              key={f.name}
              onClick={() => setPreviewFont(f.class)}
              className={`group relative h-20 flex items-center justify-center rounded-2xl border transition-all cursor-pointer overflow-hidden
                ${previewFont === f.class ? 'border-blue-500 bg-blue-50/50 ring-4 ring-blue-50' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 z-10 px-2 text-center">
                <span className="text-[12px] font-black uppercase tracking-tighter text-blue-600 leading-tight">{f.name}</span>
              </div>
              <span className={`${f.class} text-xl text-slate-500 group-hover:scale-150 transition-all`}>Aa</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VÄRITAULUKKO */}
      <div className="overflow-x-auto rounded-[2rem] border border-slate-100 bg-slate-900 p-4 shadow-sm">
        <table className="w-full border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="p-2 text-left text-[8px] font-black uppercase text-slate-200 tracking-widest">Väri</th>
              {SHADES.map(s => <th key={s} className="text-[8px] font-black text-slate-200 tracking-tighter">{s}</th>)}
            </tr>
          </thead>
          <tbody>
            {COLORS.map(color => (
              <tr key={color}>
                <td className="text-[9px] font-black text-slate-300 pr-4 uppercase tracking-tighter">{color}</td>
                {SHADES.map(shade => (
                  <td key={shade}>
                    <button
                      onClick={() => handleColorClick(color, shade)}
                      style={{ backgroundColor: `var(--color-${color}-${shade})` }}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-lg border border-black/5 hover:scale-125 hover:rotate-6 hover:shadow-xl transition-all cursor-pointer active:scale-90"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}