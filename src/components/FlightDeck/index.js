import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function FlightDeck() {
  const [data, setData] = useState({
    pitch: 0, roll: 0, yaw: 0, 
    speed: 0, alt: 100, power: 0
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const k = e.key.toLowerCase();
      setData(prev => ({
        ...prev,
        // Nuoli ylös/alas: Teho
        power: k === 'arrowup' ? Math.min(prev.power + 5, 100) : (k === 'arrowdown' ? Math.max(prev.power - 5, 0) : prev.power),
        // W: Nokka alas (+), S: Nokka ylös (-)
        pitch: k === 'w' ? prev.pitch + 2 : (k === 's' ? prev.pitch - 2 : prev.pitch),
        // A/D: Kallistus
        roll: k === 'a' ? prev.roll - 5 : (k === 'd' ? prev.roll + 5 : prev.roll),
        // Nuolet vasen/oikea: Yaw (peräsin)
        yaw: k === 'arrowleft' ? prev.yaw - 2 : (k === 'arrowright' ? prev.yaw + 2 : prev.yaw),
      }));
    };

    window.addEventListener('keydown', handleKeyDown);
    
    const physics = setInterval(() => {
      setData(prev => {
        // 1. PUOLITETTU KIIHTYVYYS (0.05 kerroin)
        const acceleration = (prev.power - prev.speed * 0.1) * 0.05;
        const newSpeed = Math.max(0, prev.speed + acceleration);

        // 2. ROLL AIHEUTTAA KAARTAMISEN (Roll -> Yaw kytkös)
        const rollInducedYaw = prev.roll * 0.15; 
        const newYaw = prev.yaw + rollInducedYaw;

        // 3. NOUSU/LASKU (Pitch ja Speed vaikuttavat korkeuteen)
        // Kun pitch on negatiivinen (S painettu), climbEffect on positiivinen
        const climbEffect = -prev.pitch * (newSpeed / 200);
        const newAlt = Math.max(0, prev.alt + climbEffect);

        return {
          ...prev,
          speed: newSpeed,
          yaw: newYaw,
          alt: newAlt,
          // Automaattinen oikaisu (kone pyrkii vakaaksi)
          roll: prev.roll * 0.95,
          pitch: prev.pitch * 0.98
        };
      });
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(physics);
    };
  }, []);

  return (
    <div className={styles.cockpit}>
      <div className={styles.instrumentGrid}>
        
        {/* KEINOHORISONTTI */}
        <div className={styles.instrument}>
          {/* translateY:n etumerkki käännetty: pitch -2 (nokka ylös) -> translateY +6px (maa laskee) */}
          <div className={styles.horizon} style={{ 
            transform: `rotate(${-data.roll}deg) translateY(${-data.pitch * 3}px)` 
          }}>
            <div className={styles.sky}></div>
            <div className={styles.ground}></div>
          </div>
          <div className={styles.planeMarker}>
             <div className={styles.wingLeft}></div>
             <div className={styles.wingRight}></div>
          </div>
        </div>

        {/* KOMPASSI */}
        <div className={styles.instrument}>
            <div className={styles.compassDisk} style={{ transform: `rotate(${-data.yaw}deg)` }}>
                <span className={styles.north}>N</span>
                <span className={styles.east}>E</span>
                <span className={styles.south}>S</span>
                <span className={styles.west}>W</span>
            </div>
            <div className={styles.pointer}>▼</div>
            <label className={styles.instrLabel}>{Math.floor(((data.yaw % 360) + 360) % 360)}°</label>
        </div>

        {/* NOPEUS & KORKEUS */}
        <div className={styles.digitalPanel}>
          {data.speed < 15 && data.alt > 10 && (
            <div className={styles.stallWarning}>⚠️ STALL</div>
          )}
          <div className={styles.stat}>SPD: {Math.round(data.speed)} kt</div>
          <div className={styles.stat}>ALT: {Math.round(data.alt)} ft</div>
          <div className={styles.stat}>PWR: {data.power}%</div>
        </div>
      </div>
      <p className={styles.controlsHint}>W/S: Pitch | A/D: Roll | Nuolet: Power & Yaw</p>
    </div>
  );
}