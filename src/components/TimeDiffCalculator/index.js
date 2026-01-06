import React, { useState } from 'react';
import styles from './styles.module.css';

export default function TimeDiffCalculator() {
  const [h1, setH1] = useState('');
  const [m1, setM1] = useState('');
  const [h2, setH2] = useState('');
  const [m2, setM2] = useState('');
  const [op, setOp] = useState('+');

  const calculate = () => {
    // Muutetaan ensimmäinen aika minuuteiksi
    const min1 = (parseInt(h1) || 0) * 60 + (parseInt(m1) || 0);
    
    // Toinen arvo voi olla joko aikaa (summa/erotus) tai kerroin (kerto/jako)
    const val2H = parseInt(h2) || 0;
    const val2M = parseInt(m2) || 0;
    const min2 = val2H * 60 + val2M;

    let resultMin = 0;

    switch (op) {
      case '+': resultMin = min1 + min2; break;
      case '-': resultMin = min1 - min2; break;
      case '*': 
        // Kertolaskussa h2 toimii kertoimena
        resultMin = min1 * (parseFloat(h2) || 1); 
        break;
      case '/': 
        // Jakolaskussa h2 toimii jakajana
        const divisor = parseFloat(h2) || 1;
        resultMin = divisor !== 0 ? min1 / divisor : 0; 
        break;
      default: resultMin = min1;
    }

    // Muutetaan takaisin tunneiksi ja minuuteiksi
    const absoluteMin = Math.abs(Math.round(resultMin));
    const h = Math.floor(absoluteMin / 60);
    const m = absoluteMin % 60;
    
    return `${resultMin < 0 ? '-' : ''}${h}h ${m}m`;
  };

  return (
    <div className={styles.calcContainer}>
      <h3 className={styles.title}>Monitoimilaskin</h3>
      
      {/* AIKA 1 */}
      <div className={styles.inputGroup}>
        <div className={styles.timeInputs}>
          <input type="number" placeholder="h" value={h1} onChange={e => setH1(e.target.value)} />
          <span>:</span>
          <input type="number" placeholder="m" value={m1} onChange={e => setM1(e.target.value)} />
        </div>
      </div>

      {/* OPERAATTORI */}
      <div className={styles.operatorRow}>
        <select value={op} onChange={e => setOp(e.target.value)} className={styles.selectOp}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">×</option>
          <option value="/">÷</option>
        </select>
      </div>

      {/* AIKA 2 TAI KERROIN */}
      <div className={styles.inputGroup}>
        <div className={styles.timeInputs}>
          <input type="number" placeholder={op === '*' || op === '/' ? "n" : "h"} value={h2} onChange={e => setH2(e.target.value)} />
          {(op === '+' || op === '-') && (
            <>
              <span>:</span>
              <input type="number" placeholder="m" value={m2} onChange={e => setM2(e.target.value)} />
            </>
          )}
        </div>
        <small className={styles.hint}>
          {op === '*' || op === '/' ? "(Syötä kerroin/jakaja h-kenttään)" : "(Syötä h ja m)"}
        </small>
      </div>

      {/* TULOS */}
      <div className={styles.resultDisplay}>
        Tulos: {calculate()}
      </div>
    </div>
  );
}