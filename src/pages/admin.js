import React, { useState } from 'react';

export default function TaskGenerator() {
  const [jobInfo, setJobInfo] = useState({ title: 'Märkätila-asennus', description: '' });
  
  // Päävaiheet (Vaihe 1, 2, 3...)
  const [mainSteps, setMainSteps] = useState([
    { title: 'Pohjatyöt', subTasks: [{ label: 'Siivous', requirePhoto: false }] }
  ]);
  
  const [massConfig, setMassConfig] = useState({ 
    locationType: 'KPH', 
    prefix: 'Asunto', 
    startNum: 1, 
    count: 3 
  });
  
  const [generatedJson, setGeneratedJson] = useState('');

  const addMainStep = () => {
    setMainSteps([...mainSteps, { 
      title: `Vaihe ${mainSteps.length + 1}`, 
      subTasks: [{ label: '', requirePhoto: false }] 
    }]);
  };

  const addSubTask = (mIdx) => {
    const newSteps = [...mainSteps];
    newSteps[mIdx].subTasks.push({ label: '', requirePhoto: false });
    setMainSteps(newSteps);
  };

  const generate = () => {
    const allTasks = [];
    const timestamp = Date.now();

    // Loopataan asuntojen määrän mukaan
    for (let i = 0; i < massConfig.count; i++) {
      const apartmentNum = massConfig.startNum + i;
      const apartmentName = `${massConfig.prefix} ${apartmentNum}`;

      // Rakennetaan asunnon kaikki vaiheet yhdeksi "steps" -listaksi
      const combinedSteps = [];
      mainSteps.forEach((ms, msIdx) => {
        // Lisätään vaiheen otsikko ikään kuin erottimena (label: VAIHE 1: Otsikko)
        ms.subTasks.forEach((st, stIdx) => {
          combinedSteps.push({
            label: `${msIdx + 1}${String.fromCharCode(97 + stIdx)}) ${ms.title}: ${st.label}`,
            requirePhoto: st.requirePhoto
          });
        });
      });

      allTasks.push({
        id: `apt-${timestamp}-${apartmentNum}`,
        title: `${apartmentName} - ${jobInfo.title}`,
        location: massConfig.locationType,
        description: jobInfo.description,
        steps: combinedSteps, // Kaikki vaiheet yhdessä paketissa
        status: "active"
      });
    }

    setGeneratedJson(JSON.stringify(allTasks, null, 2));
  };

  return (
    <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-2xl font-sans border-b-8 border-blue-600">
      <h2 className="text-3xl font-black uppercase mb-8 tracking-tighter text-center">Asuntopaketti-Generaattori</h2>

      {/* TYÖN PERUSTIEDOT */}
      <div className="bg-slate-800/50 p-6 rounded-3xl mb-8 border border-slate-700">
        <input 
          className="bg-slate-900 w-full p-4 rounded-2xl border-none font-bold text-white mb-2 shadow-inner" 
          placeholder="Työn nimi (esim. Vedeneristys)" 
          value={jobInfo.title} 
          onChange={e => setJobInfo({...jobInfo, title: e.target.value})} 
        />
      </div>

      {/* VAIHEIDEN RAKENNUS */}
      <div className="space-y-6 mb-10">
        {mainSteps.map((step, mIdx) => (
          <div key={mIdx} className="bg-white/5 p-6 rounded-[2rem] border border-white/10 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="bg-blue-600 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                 {mIdx + 1}
               </div>
               <input 
                className="bg-transparent border-b-2 border-blue-500/50 text-xl font-black outline-none flex-1 text-white focus:border-blue-500 py-2" 
                value={step.title} 
                onChange={e => {
                  const n = [...mainSteps]; n[mIdx].title = e.target.value; setMainSteps(n);
                }}
                placeholder="Vaiheen nimi"
              />
            </div>

            <div className="space-y-3 ml-12">
              {step.subTasks.map((st, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-white/5">
                  <span className="text-blue-400 font-black w-6 text-center">{String.fromCharCode(97 + sIdx)}</span>
                  <input 
                    className="bg-transparent border-none flex-1 text-sm text-white outline-none" 
                    placeholder="Alatehtävä..." 
                    value={st.label} 
                    onChange={e => {
                      const n = [...mainSteps]; n[mIdx].subTasks[sIdx].label = e.target.value; setMainSteps(n);
                    }} 
                  />
                </div>
              ))}
              <button onClick={() => addSubTask(mIdx)} className="text-[10px] font-black text-blue-400 uppercase mt-4">➕ Lisää vaihe {String.fromCharCode(97 + step.subTasks.length)}</button>
            </div>
          </div>
        ))}
        
        <button onClick={addMainStep} className="w-full py-4 border-4 border-dashed border-slate-800 rounded-3xl text-slate-500 font-black uppercase hover:border-blue-600 hover:text-blue-600 transition-all">
          + Lisää uusi päävaihe {mainSteps.length + 1}
        </button>
      </div>

      {/* VAIHE 2: ASUNTOJEN MÄÄRITYS */}
      <div className="bg-white text-slate-900 p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest text-center italic">Vaihe 2: Monista asunnot</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="text-[10px] font-black text-slate-400 block mb-1">Prefix</label>
            <input className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none" value={massConfig.prefix} onChange={e => setMassConfig({...massConfig, prefix: e.target.value})} />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 block mb-1">Alkaen nro</label>
            <input type="number" className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none" value={massConfig.startNum} onChange={e => setMassConfig({...massConfig, startNum: parseInt(e.target.value)})} />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 block mb-1">Asuntojen määrä</label>
            <input type="number" className="w-full p-4 bg-slate-100 rounded-2xl font-bold border-none" value={massConfig.count} onChange={e => setMassConfig({...massConfig, count: parseInt(e.target.value)})} />
          </div>
        </div>
        
        <button onClick={generate} className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          Generoi {massConfig.count} asuntopakettia 🚀
        </button>
      </div>

      {generatedJson && (
        <div className="mt-8 bg-black/40 p-6 rounded-[2rem] border border-white/10">
           <button 
             onClick={() => {
               const blob = new Blob([generatedJson], { type: 'application/json' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url; a.download = 'tasks.json'; a.click();
             }}
             className="w-full bg-green-600 text-white py-3 rounded-xl font-black uppercase text-xs mb-4"
           >
             Lataa tasks.json
           </button>
           <pre className="text-[9px] text-slate-500 overflow-auto max-h-48 font-mono">{generatedJson}</pre>
        </div>
      )}
    </div>
  );
}