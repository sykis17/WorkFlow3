import React, { useState } from 'react';
import styles from './styles.module.css';

export default function TimeCalculator() {
  const [rows, setRows] = useState([{ h: '', m: '' }]); // Aloitetaan yhdellä rivillä

  // Lisää uusi tyhjä rivi listaan
  const addRow = () => {
    setRows([...rows, { h: '', m: '' }]);
  };

  // Päivitä tietyn rivin arvoa
  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // Poista rivi
  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  // Laske kaikkien rivien summa
  const calculateTotal = () => {
    let totalMinutes = 0;
    rows.forEach(row => {
      totalMinutes += (parseInt(row.h) || 0) * 60 + (parseInt(row.m) || 0);
    });

    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className={styles.calcContainer}>
      <h3>Työaikalaskin (Yhteenlasku)</h3>
      <p className={styles.info}>Lisää vuoroja ja laske kokonaisaika.</p>

      {rows.map((row, index) => (
        <div key={index} className={styles.inputRow}>
          <input
            type="number"
            placeholder="h"
            value={row.h}
            onChange={(e) => updateRow(index, 'h', e.target.value)}
          />
          <span>:</span>
          <input
            type="number"
            placeholder="m"
            value={row.m}
            onChange={(e) => updateRow(index, 'm', e.target.value)}
          />
          {rows.length > 1 && (
            <button className={styles.removeBtn} onClick={() => removeRow(index)}>✕</button>
          )}
        </div>
      ))}

      <div className={styles.actionButtons}>
        <button className={styles.addBtn} onClick={addRow}>+ Lisää rivi</button>
      </div>

      <div className={styles.resultBox}>
        Yhteensä: {calculateTotal()}
      </div>
    </div>
  );
}