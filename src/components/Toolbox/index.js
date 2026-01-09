import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

// ... Toolbox-komponentin sisällä ...

const tools = [
  {
    title: "Lämpötilamuunnin",
    description: "Muunna Celsius ja Fahrenheit -asteet visuaalisen mittarin avulla.",
    category: "Laskurit",
    link: "/lampotila",
    icon: "🌡️"
  },
  {
    title: "Säädössimulaattori",
    description: "Interaktiivinen päätöspuu oikeudelliseen tulkintaan.",
    category: "Legal Tech",
    link: "/docs/koodari",
    icon: "⚖️"
  },
  {
    title: "Aikavälilaskuri",
    description: "Laske päivien ja tuntien erotus kahden päivämäärän välillä.",
    category: "Laskurit",
    link: "/docs/aikavali",
    icon: "⏱️"
  },
  {
    title: "Tailwind Playground",
    description: "Testaa Tailwind-luokkia ja näe muutokset livenä.",
    category: "Kehitys",
    link: "/playground",
    icon: "🚀"
  }
];

export default function Toolbox() {
  const [search, setSearch] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.title.toLowerCase().includes(search.toLowerCase()) ||
    tool.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 bg-slate-50 min-h-[500px] rounded-3xl my-8 border border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Hakupalkki */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Työkalupakki</h2>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Etsi työkaluja tai kategorioita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-slate-700 shadow-sm"
            />
            <span className="absolute left-4 top-4 text-2xl opacity-30">🔍</span>
          </div>
        </div>

        {/* Työkalukortit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool, index) => (
            <Link 
              to={tool.link} 
              key={index}
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all no-underline decoration-transparent transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl bg-slate-100 p-3 rounded-xl group-hover:bg-blue-50 transition-colors">
                  {tool.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">
                    {tool.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tyhjä tila, jos mitään ei löydy */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 italic">Hups! Työkalua "{search}" ei vielä löytynyt.</p>
          </div>
        )}
      </div>
    </div>
  );
}