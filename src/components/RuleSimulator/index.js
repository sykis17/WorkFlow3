import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "Onko aluksen pituus yli 24 metriä?",
    options: [
      { text: "Kyllä", next: 2 },
      { text: "Ei", next: 'tulos-ei-sovelleta' }
    ]
  },
  {
    id: 2,
    text: "Onko kyseessä kansainvälinen liikenne?",
    options: [
      { text: "Kyllä", next: 3 },
      { text: "Ei (Kotimaanliikenne)", next: 'tulos-kotimaa' }
    ]
  },
  {
    id: 3,
    text: "Kuljettaako alus vaarallisia aineita (IMDG)?",
    options: [
      { text: "Kyllä", next: 'tulos-tiukka' },
      { text: "Ei", next: 'tulos-normaali' }
    ]
  }
];

const results = {
  'tulos-ei-sovelleta': "Säädöstä ei sovelleta pituuden perusteella.",
  'tulos-kotimaa': "Sovelletaan kotimaan liikenteen kevyempiä määräyksiä.",
  'tulos-normaali': "Sovelletaan standardeja kansainvälisiä määräyksiä.",
  'tulos-tiukka': "HUOM! Sovelletaan tiukennettuja turvamääräyksiä (IMDG-koodi)."
};

export default function RuleSimulator() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleOption = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const reset = () => {
    setCurrentStep(1);
  };

  const currentQ = questions.find(q => q.id === currentStep);

  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm my-6">
      <h3 className="text-xl font-bold mb-4 text-slate-800">Säädös-simulaattori</h3>
      
      {currentQ ? (
        <div className="space-y-4">
          <p className="text-lg text-slate-700 font-medium">{currentQ.text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleOption(opt.next)} 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors font-semibold"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 border-l-4 border-blue-500 rounded-r-md">
          <h4 className="font-bold text-blue-800">Päätös:</h4>
          <p className="text-slate-700 my-2">{results[currentStep]}</p>
          <button 
            onClick={reset} 
            className="mt-4 text-sm text-blue-600 hover:underline font-medium"
          >
            ← Aloita alusta
          </button>
        </div>
      )}
    </div>
  );
}