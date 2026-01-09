import React from 'react';

export default function GridBoxes() {
  return (
    <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner">
      {/* grid-cols-2 = kaksi saraketta
        gap-4 = 16px väli laatikoiden välillä 
      */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Laatikko 1 */}
        <div className="p-8 bg-blue-500 text-white rounded-xl shadow-md flex items-center justify-center font-bold">
          1. Ylävasen
        </div>

        {/* Laatikko 2 */}
        <div className="p-8 bg-emerald-500 text-white rounded-xl shadow-md flex items-center justify-center font-bold">
          2. Yläoikea
        </div>

        {/* Laatikko 3 */}
        <div className="p-8 bg-amber-500 text-white rounded-xl shadow-md flex items-center justify-center font-bold">
          3. Alavasen
        </div>

        {/* Laatikko 4 */}
        <div className="p-8 bg-rose-500 text-white rounded-xl shadow-md flex items-center justify-center font-bold">
          4. Alaoikea
        </div>

      </div>
    </div>
  );
}