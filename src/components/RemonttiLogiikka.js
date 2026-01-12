import React, { useState } from 'react';
import Translate from '@docusaurus/Translate';

export default function RemonttiLogiikka() {
  // 1. Management: Insinööri määrittelee vaiheet
  const [vaiheet, setVaiheet] = useState([
    { id: 1, nimi: 'Aloitus', status: 'Ei aloitettu', kuva: null },
    { id: 2, nimi: 'Purku & Siivous', status: 'Ei aloitettu', kuva: null },
    { id: 3, nimi: 'Vesieristys', status: 'Ei aloitettu', kuva: null },
    { id: 4, nimi: 'Laatoitus', status: 'Ei aloitettu', kuva: null },
  ]);

  const [raportti, setRaportti] = useState([]);

  // 2. Worker: Päivittää statuksen ja "lähettää" kuvan
  const paivitaStatus = (id, uusiStatus) => {
    setVaiheet(vaiheet.map(v => v.id === id ? { ...v, status: uusiStatus, kuva: '📷 Kuva ladattu' } : v));
  };

  // 3. Monitoring: Kokoaa raportin
  const lahetaRaportti = () => {
    setRaportti([...vaiheet]);
    alert("Raportti lähetetty seurantaan!");
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* MANAGEMENT SIDE */}
      <section className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded">
        <h2 className="text-blue-800 uppercase text-sm font-bold tracking-widest mb-4">🛠️ Management</h2>
        <p className="text-sm mb-2 text-slate-600">Määritetyt työvaiheet KPH-remonttiin:</p>
        <div className="flex flex-wrap gap-2">
          {vaiheet.map(v => (
            <span key={v.id} className="bg-white px-3 py-1 rounded border border-blue-200 text-xs shadow-sm">
              {v.id}. {v.nimi}
            </span>
          ))}
        </div>
      </section>

      {/* WORKER SIDE */}
      <section className="p-6 bg-orange-50 border-l-4 border-orange-500 rounded">
        <h2 className="text-orange-800 uppercase text-sm font-bold tracking-widest mb-4">👷 Worker Side</h2>
        <div className="space-y-3">
          {vaiheet.map(v => (
            <div key={v.id} className="bg-white p-3 rounded shadow-sm flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800">{v.nimi}</span>
                <p className="text-xs text-slate-500">{v.status}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => paivitaStatus(v.id, 'Valmis')}
                  className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
                >
                  Valmis & Kuva
                </button>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={lahetaRaportti}
          className="mt-6 w-full bg-slate-800 text-white py-3 rounded font-bold hover:bg-slate-900 transition-transform active:scale-95"
        >
          LÄHETÄ RAPORTTI SIJOITTAJALLE
        </button>
      </section>

      {/* MONITORING SIDE */}
      {raportti.length > 0 && (
        <section className="p-6 bg-green-50 border-l-4 border-green-600 rounded animate-pulse-once">
          <h2 className="text-green-800 uppercase text-sm font-bold tracking-widest mb-4">📈 Monitoring (Investor View)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {raportti.map(v => (
              <div key={v.id} className="bg-white p-4 rounded border border-green-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">{v.nimi}</span>
                  <span className={`text-xs px-2 py-1 rounded ${v.status === 'Valmis' ? 'bg-green-100 text-green-700' : 'bg-slate-100'}`}>
                    {v.status}
                  </span>
                </div>
                {v.kuva && <div className="h-20 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400 italic border-dashed border-2 border-slate-200">{v.kuva}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}