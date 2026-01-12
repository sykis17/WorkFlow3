import React, { useState } from 'react';

export default function TaskGenerator() {
  const [jobInfo, setJobInfo] = useState({ title: '', description: '', instructions: '' });
  
  // Lista päävaiheista (Vaihe 1, 2, 3...)
  const [mainSteps, setMainSteps] = useState([
    { title: 'Vaihe 1', subTasks: [{ label: '', requirePhoto: false }] }
  ]);
  
  const [massConfig, setMassConfig] = useState({ locationType: 'KPH', prefix: 'Asunto 1a' });
  const [generatedJson, setGeneratedJson] = useState('');

  // LISÄÄ UUSI PÄÄVAIHE (Vaihe 2 -> Vaihe 3 -> Vaihe 4...)
  const addMainStep = () => {
    setMainSteps([...mainSteps, { 
      title: `Vaihe ${mainSteps.length + 1}`, 
      subTasks: [{ label: '', requirePhoto: false }] 
    }]);
  };

  // PÄIVITÄ PÄÄVAIHEEN NIMI
  const updateMainTitle = (mIdx, val) => {
    const newSteps = [...mainSteps];
    newSteps[mIdx].title = val;
    setMainSteps(newSteps);
  };

  // LISÄÄ ALATEHTÄVÄ (a, b, c) TIETYN PÄÄVAIHEEN ALLE
  const addSubTask = (mIdx) => {
    const newSteps = [...mainSteps];
    newSteps[mIdx].subTasks.push({ label: '', requirePhoto: false });
    setMainSteps(newSteps);
  };

  // PÄIVITÄ ALATEHTÄVÄN TEKSTI
  const updateSubTaskLabel = (mIdx, sIdx, val) => {
    const newSteps = [...mainSteps];
    newSteps[mIdx].subTasks[sIdx].label = val;
    setMainSteps(newSteps);
  };

  const generate = () => {
    const allTasks = [];
    const timestamp = Date.now();

    // Generoidaan jokainen päävaihe omana tehtävänä JSON-listaan
    mainSteps.forEach((step, mIdx) => {
      allTasks.push({
        id: `step-${timestamp}-${mIdx}`,
        project: massConfig.prefix,
        location: massConfig.locationType,
        title: `${jobInfo.title}: ${step.title}`,
        description: jobInfo.description,
        instructions: jobInfo.instructions,
        steps: step.subTasks.map((st, si) => ({
          label: `${String.fromCharCode(97 + si)}) ${st.label}`,
          requirePhoto: st.requirePhoto
        })),
        status: "active"
      });
    });
    setGeneratedJson(JSON.stringify(allTasks, null, 2));
  };

  return (
    <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl font-sans border-b-8 border-blue-600">
      <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter text-center italic">Insinöörin Hierarkia-työkalu</h2>

      {/* TYÖN PERUSTIEDOT */}
      <div className="bg-slate-800/50 p-6 rounded-3xl mb-8 border border-slate-700">
        <h3 className="text-[10px] font-black uppercase text-blue-400 mb-4 tracking-[0.2em]">Yleistiedot</h3>
        <div className="grid grid-cols-1 gap-4">
          <input className="bg-slate-900 p-4 rounded-2xl border-none font-bold text-white shadow-inner" placeholder="Työ (esim. Märkätila-asennus)" value={jobInfo.title} onChange={e => setJobInfo({...jobInfo, title: e.target.value})} />
          <input className="bg-slate-900 p-4 rounded-2xl border-none text-sm text-white" placeholder="Yleinen kuvaus..." value={jobInfo.description} onChange={e => setJobInfo({...jobInfo, description: e.target.value})} />
        </div>
      </div>

      {/* DYNAAMISET PÄÄVAIHEET (1, 2, 3, 4...) */}
      <div className="space-y-6 mb-10">
        {mainSteps.map((step, mIdx) => (
          <div key={mIdx} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 relative shadow-xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg rotate-3 shadow-lg">
                 {mIdx + 1}
               </div>
               <input 
                className="bg-transparent border-b-2 border-blue-500/50 text-xl font-black outline-none flex-1 text-white focus:border-blue-500 py-2" 
                value={step.title} 
                onChange={e => updateMainTitle(mIdx, e.target.value)}
                placeholder={`Vaihe ${mIdx + 1}`}
              />
            </div>

            {/* ALATEHTÄVÄT a, b, c... */}
            <div className="space-y-3 ml-12">
              {step.subTasks.map((st, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-white/5 shadow-inner">
                  <span className="text-blue-400 font-black w-6 text-center">{String.fromCharCode(97 + sIdx)}</span>
                  <input 
                    className="bg-transparent border-none flex-1 text-sm text-white outline-none" 
                    placeholder="Kirjoita tehtävän sisältö..." 
                    value={st.label} 
                    onChange={e => updateSubTaskLabel(mIdx, sIdx, e.target.value)} 
                  />
                </div>
              ))}
              
              <button 
                onClick={() => addSubTask(mIdx)} 
                className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase mt-4 hover:bg-blue-500/10 p-2 rounded-lg transition-all"
              >
                <span>➕ LISÄÄ ALAVAIHE ({String.fromCharCode(97 + step.subTasks.length)})</span>
              </button>
            </div>
          </div>
        ))}
        
        {/* LISÄÄ VAIHE 3, 4... NAPPI */}
        <button 
          onClick={addMainStep} 
          className="w-full py-6 border-4 border-dashed border-slate-700 rounded-[2.5rem] text-slate-500 font-black uppercase text-sm hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/5 transition-all flex items-center justify-center gap-3"
        >
          <span className="text-2xl">+</span> LISÄÄ PÄÄVAIHE {mainSteps.length + 1}
        </button>
      </div>

      {/* MONISTUS JA GENERUOINTI */}
      <div className="bg-white text-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest text-center">Vaihe 2: Kohteen skaalaus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Sijaintityyppi</label>
            <select className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none appearance-none" value={massConfig.locationType} onChange={e => setMassConfig({...massConfig, locationType: e.target.value})}>
              <option>KPH</option><option>KEITTIÖ</option><option>AUTOTALLI</option><option>KELLARI</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Kohteen tunnus</label>
            <input className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none" placeholder="Asunto 1a" value={massConfig.prefix} onChange={e => setMassConfig({...massConfig, prefix: e.target.value})} />
          </div>
        </div>
        
        <button onClick={generate} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/30 active:scale-95 transition-all">
          Luo {mainSteps.length} tehtäväpakettia lennosta 🚀
        </button>
      </div>

      {generatedJson && (
        <div className="mt-8 bg-black/40 p-6 rounded-[2rem] border border-white/10 animate-in fade-in duration-500">
           <div className="flex justify-between items-center mb-4">
             <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Datan export valmis</span>
             <button 
               onClick={() => {
                 const blob = new Blob([generatedJson], { type: 'application/json' });
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url; a.download = 'tasks.json'; a.click();
               }}
               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all shadow-lg"
             >
               Lataa .json
             </button>
           </div>
           <pre className="text-[9px] text-slate-500 overflow-auto max-h-48 font-mono bg-slate-900/50 p-4 rounded-xl">
             {generatedJson}
           </pre>
        </div>
      )}
    </div>
  );
}