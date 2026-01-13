import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { siteConfig } = useDocusaurusContext();
  const apiKey = siteConfig.customFields.geminiApiKey;

  // HUOM: Tuo API-avain myöhemmin .env-tiedostosta
  const genAI = new GoogleGenerativeAI(apiKey);

  async function askAI() {
    if (!input) return;
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Tässä syötetään "konteksti" eli AI_INSTRUCTIONS
      const prompt = `
        Olet WorkFlow3-projektin asiantuntija-apulainen. 
        Käytä vastauksissasi teknistä mutta selkeää kieltä.
        Käyttäjän kysymys: ${input}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      setResponse("Virhe AI-yhteydessä: " + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-6 border border-blue-500/30 rounded-xl bg-slate-900 shadow-xl my-4 font-inter">
      <h3 className="text-blue-400 mb-4 flex items-center gap-2">
        <span>🤖</span> WorkFlow3 AI-Assistentti
      </h3>
      
      <textarea
        className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Kysy koodista tai ylläpidosta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg font-bold transition-all disabled:opacity-50"
      >
        {loading ? 'Analysoidaan...' : 'Kysy AI:lta'}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border-l-4 border-blue-500 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}