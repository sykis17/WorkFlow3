import React, { useState } from 'react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');

  const convertToF = (c) => (c * 9/5 + 32).toFixed(1);
  const convertToC = (f) => ((f - 32) * 5/9).toFixed(1);

  // Lasketaan palkin leveys (0-100%) välillä -20°C ... +100°C
  const getProgress = () => {
    const temp = parseFloat(celsius);
    if (isNaN(temp)) return 0;
    const min = -20;
    const max = 100;
    const percentage = ((temp - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100); // Pidetään välillä 0-100
  };

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    setFahrenheit(value !== '' ? convertToF(value) : '');
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelsius(value !== '' ? convertToC(value) : '');
  };

  const progress = getProgress();

  return (
    <div className="my-8 p-8 bg-slate-900 rounded-3xl shadow-2xl max-w-md mx-auto text-white border border-slate-700">
      <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
        Lämpötilamittari
      </h3>
      
      {/* Visualisointipalkki */}
      <div className="mb-8">
        <div className="flex justify-between text-xs mb-2 text-slate-400 uppercase tracking-widest">
          <span>Kylmä (-20°C)</span>
          <span>Kuuma (100°C)</span>
        </div>
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              backgroundColor: `rgb(${progress * 2.55}, ${100 - progress}, ${255 - progress * 2.55})`,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="relative">
          <label className="text-xs font-bold text-slate-400 mb-1 block ml-1 uppercase">Celsius</label>
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 outline-none text-xl transition-all"
            placeholder="0"
          />
          <span className="absolute right-4 bottom-4 text-slate-500 font-bold">°C</span>
        </div>

        <div className="relative">
          <label className="text-xs font-bold text-slate-400 mb-1 block ml-1 uppercase">Fahrenheit</label>
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-orange-500 outline-none text-xl transition-all"
            placeholder="32"
          />
          <span className="absolute right-4 bottom-4 text-slate-500 font-bold">°F</span>
        </div>
      </div>
    </div>
  );
}