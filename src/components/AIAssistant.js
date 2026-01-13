import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function AIAssistant() {
  const { siteConfig } = useDocusaurusContext();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = siteConfig.customFields.geminiApiKey;
  const genAI = new GoogleGenerativeAI(apiKey);

  async function askAI() {
    if (!input) return;
    setLoading(true);
    try {
      // 1. Haetaan CODE_MAP.md tiedoston sisältö, jotta AI ymmärtää koodin
      // Huom: Tämä hakee sen julkisesta URL:sta buildin jälkeen
      const contextRes = await fetch('/WorkFlow3/docs/ai-context/CODE_MAP.txt').catch(() => null);
      const codeContext = contextRes ? await contextRes.text() : "Koodikarttaa ei löytynyt.";

      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `
        Olet WorkFlow3-projektin asiantuntija. 
        Tässä on projektin tekninen koodikartta:
        ${codeContext.substring(0, 5000)} 

        Käyttäjän kysymys: ${input}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      setResponse("Virhe: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4 border border-blue-500 rounded-lg bg-slate-900 text-white shadow-2xl">
      <h3 className="text-blue-400 flex items-center gap-2 mb-3">🤖 WorkFlow3 Assistentti</h3>
      <textarea 
        className="w-full p-2 bg-slate-800 rounded border border-slate-700 text-sm"
        rows="4"
        placeholder="Miten koodi toimii? Mitä minun pitäisi tehdä seuraavaksi?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={askAI} 
        className="mt-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition-colors"
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