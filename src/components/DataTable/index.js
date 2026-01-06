import React, { useState } from 'react';
import styles from './styles.module.css';

const DATA = [
  { id: 1, säädös: "SOLAS - Hengenvaara merellä", kategoria: "Turvallisuus", vuosi: 1974 },
  { id: 2, säädös: "MARPOL - Meren saastuminen", kategoria: "Ympäristö", vuosi: 1973 },
  { id: 3, säädös: "MLC - Merityöehtosopimus", kategoria: "Työoikeus", vuosi: 2006 },
  { id: 4, säädös: "STCW - Koulutus ja pätevyys", kategoria: "Koulutus", vuosi: 1978 },
];

export default function DataTable() {
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  // Filtteröinti
  const filteredData = DATA.filter(item => 
    item.säädös.toLowerCase().includes(filter.toLowerCase()) ||
    item.kategoria.toLowerCase().includes(filter.toLowerCase())
  );

  // Järjestely
  if (sortConfig !== null) {
    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.tableContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Etsi säädöstä tai kategoriaa..."
        onChange={e => setFilter(e.target.value)}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => requestSort('säädös')}>Säädös 👇</th>
            <th onClick={() => requestSort('kategoria')}>Kategoria 👇</th>
            <th onClick={() => requestSort('vuosi')}>Vuosi 👇</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.säädös}</td>
              <td>{item.kategoria}</td>
              <td>{item.vuosi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}