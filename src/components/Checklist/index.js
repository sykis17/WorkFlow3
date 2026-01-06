import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function Checklist({ title, items, storageKey }) {
  // Alustetaan tila selaimen muistista tai tyhjänä listana
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [storageKey]);

  const toggleItem = (item) => {
    const newChecked = checkedItems.includes(item)
      ? checkedItems.filter((i) => i !== item)
      : [...checkedItems, item];
    
    setCheckedItems(newChecked);
    localStorage.setItem(storageKey, JSON.stringify(newChecked));
  };

  const progress = Math.round((checkedItems.length / items.length) * 100) || 0;

  return (
    <div className={styles.checklistContainer}>
      <h3 className={styles.title}>{title}</h3>
      
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
      </div>
      <small>{progress}% suoritettu</small>

      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx} className={styles.listItem} onClick={() => toggleItem(item)}>
            <input 
              type="checkbox" 
              checked={checkedItems.includes(item)} 
              readOnly 
            />
            <span className={checkedItems.includes(item) ? styles.textDone : ''}>
              {item}
            </span>
          </li>
        ))}
      </ul>
      
      <button 
        className={styles.resetBtn} 
        onClick={() => {
          setCheckedItems([]);
          localStorage.removeItem(storageKey);
        }}
      >
        Tyhjennä valinnat
      </button>
    </div>
  );
}