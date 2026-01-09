import React, { useState } from 'react';

const steps = [
  {
    year: "1994",
    title: "Merilaki (674/1994)",
    description: "Suomen nykyinen merilaki astuu voimaan. Se säätelee muun muassa alusrekisteröintiä ja merioikeudellisia vastuita.",
    details: ["Alusrekisteri", "Päällikön vastuu", "Merioikeudet"]
  },
  {
    year: "2006",
    title: "MLC 2006",
    description: "Maritime Labour Convention – Merityöyleissopimus, jota kutsutaan merenkulkijoiden 'perusoikeuskirjaksi'.",
    details: ["Työolot", "Majoitus", "Sosiaaliperusteet"]
  },
  {
    year: "2024",
    title: "Digitalisaatio & Autonomia",
    description: "Uudet säädökset etäohjattavista aluksista ja digitaalisista lokikirjoista alkavat muovata lakia.",
    details: ["MASS-säädökset", "Kyberturvallisuus", "Data-integritetti"]
  }
];

export default function Timeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-4xl mx-auto my-12">
      {/* Navigointipalkki (Aikajana) */}
      <div className="relative flex justify-between items-center mb-12">
        <div className="absolute h-1 bg-slate-200 w-full -z-0"></div>
        <div 
          className="absolute h-1 bg-blue-600 transition-all duration-500 -z-0" 
          style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
              index <= activeStep ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all ${
              index === activeStep ? 'bg-white border-blue-600 scale-125' : 
              index < activeStep ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200'
            }`}>
              {index + 1}
            </div>
            <span className="text-xs font-bold mt-2 absolute -bottom-6 whitespace-nowrap">{step.year}</span>
          </button>
        ))}
      </div>

      {/* Sisältöalue (Slide) */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 min-h-[250px] transition-all duration-500 animate-in fade-in slide-in-from-right-4">
        <h3 className="text-2xl font-black text-slate-900 mb-2">{steps[activeStep].title}</h3>
        <p className="text-slate-600 text-lg mb-6 leading-relaxed">
          {steps[activeStep].description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {steps[activeStep].details.map((detail, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {detail}
            </span>
          ))}
        </div>
      </div>

      {/* Navigointinapit */}
      <div className="flex justify-between mt-8">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(s => s - 1)}
          className="px-6 py-2 rounded-xl bg-slate-200 font-bold disabled:opacity-30 transition-hover hover:bg-slate-300"
        >
          Edellinen
        </button>
        <button 
          disabled={activeStep === steps.length - 1}
          onClick={() => setActiveStep(s => s + 1)}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold disabled:opacity-30 transition-hover hover:bg-blue-700"
        >
          Seuraava
        </button>
      </div>
    </div>
  );
}