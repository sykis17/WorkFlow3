import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function BallGame() {
  const [sensitivity, setSensitivity] = useState(5);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const containerRef = useRef(null);

  // Pelilooppi
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setPos(prev => {
        // Arvotaan pallon liike (mitä suurempi herkkyys, sitä kovempi työntö)
        const moveX = (Math.random() - 0.5) * sensitivity * 2;
        const moveY = (Math.random() - 0.5) * sensitivity * 2;
        
        const newX = prev.x + moveX;
        const newY = prev.y + moveY;

        // Tarkistetaan onko pallo neliön ulkopuolella (neliö on 200x200)
        if (newX < 0 || newX > 180 || newY < 0 || newY > 180) {
          setIsGameOver(true);
          return prev;
        }

        setScore(s => s + 1);
        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [sensitivity, isGameOver]);

  const handleMouseMove = (e) => {
    if (isGameOver) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setPos(prev => {
      // Lasketaan keskipiste (pallo on 20x20, joten +10)
      const dx = (prev.x + 10) - mouseX;
      const dy = (prev.y + 10) - mouseY;
      const distance = Math.sqrt(dx*dx + dy*dy);

      // Jos hiiri on lähellä, työnnetään palloa poispäin
      if (distance < 40) {
        return {
          x: prev.x + (dx * 0.2), // Nostettu hieman vastavoimaa
          y: prev.y + (dy * 0.2)
        };
      }
      return prev;
    });
  };

  const restart = () => {
    setPos({ x: 100, y: 100 });
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className={styles.gameWrapper}>
      <h3>DP-Simulaattori: Pidä alus ruudussa</h3>
      
      <div className={styles.controls}>
        <label>Aallokon voimakkuus (1-10): {sensitivity}</label>
        <input 
          type="range" min="1" max="10" 
          value={sensitivity} 
          onChange={(e) => setSensitivity(e.target.value)} 
        />
      </div>

      <div 
        ref={containerRef}
        className={styles.gameArea}
        onMouseMove={handleMouseMove}
      >
        {!isGameOver ? (
          <div 
            className={styles.ball} 
            style={{ left: pos.x, top: pos.y }}
          />
        ) : (
          <div className={styles.overlay}>
            <p>HÄLYTYS! Alus ajautui reitiltä.</p>
            <p>Pisteet: {score}</p>
            <button onClick={restart}>Nollaa ja yritä uudelleen</button>
          </div>
        )}
      </div>
      <p>Pisteet: {score}</p>
    </div>
  );
}