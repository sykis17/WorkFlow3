import React, { useState } from 'react';
import styles from './styles.module.css';

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
  const [history, setHistory] = useState([]);

  const handleOption = (next) => {
    setHistory([...history, currentStep]);
    setCurrentStep(next);
  };

  const reset = () => {
    setCurrentStep(1);
    setHistory([]);
  };

  const currentQ = questions.find(q => q.id === currentStep);

  return (
    <div className={styles.simContainer}>
      <h3>Säädös-simulaattori</h3>
      
      {currentQ ? (
        <div className={styles.questionBox}>
          <p className={styles.questionText}>{currentQ.text}</p>
          <div className={styles.btnGrid}>
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => handleOption(opt.next)} className={styles.optBtn}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.resultBox}>
          <h4>Päätös:</h4>
          <p>{results[currentStep]}</p>
          <button onClick={reset} className={styles.resetBtn}>Aloita alusta</button>
        </div>
      )}
    </div>
  );
}