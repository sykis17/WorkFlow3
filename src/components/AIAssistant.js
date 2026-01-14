import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function AIAssistant() {
  const { siteConfig } = useDocusaurusContext();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('worker'); // Oletusrooli

  const apiKey = siteConfig.customFields.geminiApiKey;

  const roles = {
    worker: "Suorittava työntekijä (fokus: selkeät ohjeet, checklistit, turvallisuus)",
    admin: "Pääkäyttäjä (fokus: järjestelmän hallinta, muokkaus, konfigurointi)",
    engineer: "Insinööri/Työnjohto (fokus: tekninen data, laadunvalvonta, suunnittelu)",
    monitor: "Monitoroija/Vakuutusyhtiö (fokus: raportit, audit-trail, riskienhallinta)"
  };

  async function askAI() {
    if (!input) return;
    setLoading(true);
    setResponse('');

    try {
      const contextRes = await fetch('/WorkFlow3/ai-context/CODE_MAP.txt');
      const codeContext = contextRes.ok ? await contextRes.text() : "Kontekstia ei voitu ladata.";

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-001:generateContent?key=${apiKey}`;
      
      const systemInstruction = `
        Olet WorkFlow3-projektin älykäs asiantuntija. 
        Käyttäjän nykyinen rooli on: ${roles[role]}.
        
        Käytössäsi on projektin koodikartta:
        ${codeContext.substring(0, 15000)}
        
        Huomioi vastauksessa:
        1. Jos rooli on Worker, anna lyhyitä ja selkeitä ohjeita. Käytä viittauksia työvaiheisiin (esim. 1abc2a).
        2. Jos rooli on Admin/Engineer, tarjoa teknistä analyysia ja mahdollisuutta muokata pohjia.
        3. Tiedät, että projektissa on uusia template-pohjia polussa docs/templates (logistiikka, asiakastapaamiset).
        4. Jos käyttäjä kysyy jotain, mitä ei löydy, ehdota uuden templaten luomista.
      `;

      const apiResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: `${systemInstruction}\n\nKäyttäjän kysymys: ${input}` }] 
          }]
        })
      });

      const data = await apiResponse.json();
      if (data.error) throw new Error(data.error.message);

      setResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setResponse("Virhe: " + error.message);
    } finally {
      setLoading(false);
    }
  }
    
  return (
    <div className="p-4 border border-blue-500 rounded-lg bg-slate-900 text-white shadow-2xl my-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-blue-400 flex items-center gap-2 m-0">🤖 WorkFlow3 Assistentti</h3>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="bg-slate-800 text-xs border border-blue-500 rounded px-2 py-1 outline-none"
        >
          <option value="worker">Työntekijä</option>
          <option value="admin">Admin</option>
          <option value="engineer">Insinööri</option>
          <option value="monitor">Monitoroija</option>
        </select>
      </div>

      <textarea 
        className="w-full p-2 bg-slate-800 rounded border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
        rows="3"
        placeholder={`Kysy roolissa: ${role}...`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button onClick={askAI} className="mt-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 disabled:bg-slate-600 w-full font-bold transition-all" disabled={loading}>
        {loading ? 'Analysoidaan kontekstia...' : 'LÄHETÄ KYSYMYS'}
      </button>

      {response && (
        <div className="mt-4 p-3 bg-slate-800 border-l-4 border-blue-500 text-sm whitespace-pre-wrap animate-in fade-in duration-500">
          {response}
        </div>
      )}
    </div>
  );
}

