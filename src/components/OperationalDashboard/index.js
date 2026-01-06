import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function OperationalDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Haetaan reaaliaikainen säädata Helsingin sataman koordinaateilla
    fetch('https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current_weather=true')
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div className={styles.dashboardCard}>
      <div className={styles.header}>
        <h3>🌐 Operational Status: Helsinki Port</h3>
        <div className={styles.dot}></div>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.statBox}>
          <span className={styles.label}>Temperature</span>
          <span className={styles.value}>{loading ? '...' : `${weather.temperature}°C`}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Wind Speed</span>
          <span className={styles.value}>{loading ? '...' : `${weather.windspeed} km/h`}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Legal Framework</span>
          <span className={styles.value} style={{color: '#25c2a0'}}>v3.9.2</span>
        </div>
      </div>
    </div>
  );
}