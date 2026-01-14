import React, { useState } from 'react'; // Tärkeä lisäys!
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function AIAssistant() {
  const { siteConfig } = useDocusaurusContext();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = siteConfig.customFields.geminiApiKey;

  async function askAI() {
    if (!input) return;
    setLoading(true);
    try {
      // 1. Haetaan koodikonteksti staattisesta tiedostosta (huomioi alipolku)
      const contextRes = await fetch('/WorkFlow3/ai-context/CODE_MAP.txt');
      const codeContext = contextRes.ok ? await contextRes.text() : "Kontekstia ei voitu ladata.";

      // 2. Käytetään suoraa API-kutsua (vakaampi selaimessa)
      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const apiResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Olet WorkFlow3-projektin asiantuntija. Tässä on projektin koodikartta:\n${codeContext.substring(0, 5000)}\n\nKäyttäjän kysymys: ${input}` 
            }] 
          }]
        })
      });

      const data = await apiResponse.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiText = data.candidates[0].content.parts[0].text;
      setResponse(aiText);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      setResponse("Virhe: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 border border-blue-500 rounded-lg bg-slate-900 text-white shadow-2xl my-4">
      <h3 className="text-blue-400 flex items-center gap-2 mb-3">🤖 WorkFlow3 Assistentti</h3>
      <textarea 
        className="w-full p-2 bg-slate-800 rounded border border-slate-700 text-sm text-white"
        rows="4"
        placeholder="Miten koodi toimii? Mitä minun pitäisi tehdä seuraavaksi?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={askAI} 
        className="mt-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors disabled:bg-slate-600"
        disabled={loading}
      >
        {loading ? 'Mietitään...' : 'Kysy AI:lta'}
      </button>
      {response && (
        <div className="mt-4 p-3 bg-slate-800 border-l-4 border-green-500 text-sm whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}